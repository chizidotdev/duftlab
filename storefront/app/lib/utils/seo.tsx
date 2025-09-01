import type { HttpTypes } from "@medusajs/types";

import { siteConfig } from "../site-config";

export type StructuredData = Record<string, any>;

/**
 * Creates JSON-LD script element for React components
 */
export function StructuredDataScript({ data }: { data: StructuredData | StructuredData[] }) {
  const jsonData = Array.isArray(data) ? data : [data];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonData) }}
    />
  );
}

/**
 * Organization schema for the business
 */
export function createOrganizationSchema(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.siteName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
    },
  };
}

/**
 * Website schema with search functionality
 */
export function createWebSiteSchema(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/collections/all?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Product schema for individual products
 */
export function createProductSchema(product: HttpTypes.StoreProduct, url: string): StructuredData {
  const offers =
    product.variants?.map((variant) => ({
      "@type": "Offer",
      url,
      priceCurrency: variant.calculated_price?.currency_code?.toUpperCase() || "NGN",
      price: variant.calculated_price?.calculated_amount
        ? (variant.calculated_price.calculated_amount / 100).toString()
        : "0",
      availability:
        variant.inventory_quantity && variant.inventory_quantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
    })) || [];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description:
      product.description || `${product.title} fragrance available at ${siteConfig.siteName}`,
    image: product.images?.map((img) => img.url) || [product.thumbnail].filter(Boolean),
    brand: {
      "@type": "Brand",
      name: product.collection?.title || "Premium Fragrances",
    },
    category: product.categories?.[0]?.name || "Fragrance",
    offers:
      offers.length > 0
        ? offers
        : [
            {
              "@type": "Offer",
              url,
              priceCurrency: "NGN",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: siteConfig.siteName,
              },
            },
          ],
  };
}

/**
 * Product collection/category schema
 */
export function createCollectionSchema(
  collection: { title: string; handle: string; description?: string },
  products: HttpTypes.StoreProduct[]
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${collection.title} - ${siteConfig.siteName}`,
    description:
      collection.description || `Browse our ${collection.title} collection of premium fragrances`,
    url: `${siteConfig.url}/collections/${collection.handle}`,
    mainEntity: {
      "@type": "ItemList",
      name: collection.title,
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.title,
          url: `${siteConfig.url}/products/${product.handle}`,
          image: product.thumbnail,
        },
      })),
    },
  };
}

/**
 * Breadcrumb schema for navigation
 */
export function createBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Homepage schema combining multiple schemas
 */
export function createHomePageSchemas(): StructuredData[] {
  return [createOrganizationSchema(), createWebSiteSchema()];
}
