import { ProductDTO } from "@medusajs/framework/types";
import { Heading, Img, Section } from "@react-email/components";
import EmailBody from "./components/email-body";
import Layout from "./components/layout";
import ProductsList from "./components/products-list";
import { title } from "./components/style";

export default function Welcome({ products }: { products: ProductDTO[] }) {
  return (
    <Layout preview="Welcome to Duftlab!">
      <Section className="w-full px-5 my-20" align="left">
        <Img
          src="https://duftlab.com/logo.svg"
          className="rounded-lg mb-8 w-full max-w-[560px]"
        />
        <Heading className="pb-3" style={title}>
          Discover your signature scent ✨
        </Heading>
        <EmailBody
          paragraphs={[
            "Welcome to the Duftlab family – your premier destination for authentic designer fragrances and perfumes! We're thrilled to have you here and can't wait to help you acquire your perfect signature scent.",
            "What's New at Duftlab?",
            "• Premium Quality: All our fragrances are 100% authentic, sourced directly from authorized distributors",
            "• Expert Curation: Our collection features carefully selected designer and niche fragrances",
            "• Fast Delivery: Quick shipping across Nigeria with secure packaging to preserve your fragrances",
            "• Fragrance Rewards: Join our loyalty program and get exclusive access to new arrivals and special offers",
            "Let's help you find your perfect fragrance match!",
          ]}
          signature
        />
        <ProductsList products={products} />
      </Section>
    </Layout>
  );
}
