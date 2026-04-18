import { Heading, Paragraph } from "@/components/ui/text";

import { siteLinks } from "@/lib/constants";

export default function LegalTOS() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 py-10">
      <Heading>Terms of Service</Heading>
      <Heading variant="h3">
        EFFECTIVE DATE: OCTOBER 10, 2025. LAST UPDATED: OCTOBER 10, 2025.
      </Heading>
      <Paragraph>
        Welcome to Duftlab! By accessing or using our website, you agree to the following terms and
        conditions. Please read them carefully before making a purchase.
      </Paragraph>

      <Heading variant="h3">General Terms</Heading>
      <Paragraph>
        By using our website, you confirm that you are at least 18 years old or have parental
        consent. We reserve the right to modify or update these terms at any time. Your continued
        use of the site implies acceptance of any changes.
      </Paragraph>

      <Heading variant="h3">Orders & Payments</Heading>
      <Paragraph>
        All orders are subject to availability. If an item is out of stock after purchase, we will
        notify you and issue a refund. Prices are listed in your selected currency and are subject
        to change without notice. We accept various payment methods, and all transactions are
        securely processed.
      </Paragraph>

      <Heading variant="h3">Shipping & Delivery</Heading>
      <Paragraph>
        Orders are processed within 1-3 business days. Estimated delivery times depend on your
        selected shipping method. International orders may be subject to customs fees and import
        taxes, which are the buyer’s responsibility. We are not responsible for shipping delays
        caused by external factors such as weather, customs processing, or courier issues.
      </Paragraph>

      <Heading variant="h3">Returns & Refunds</Heading>
      <Paragraph>
        All purchases made on our platform are considered final and non-refundable. We do not accept
        returns, exchanges, or issue refunds for products, including but not limited to final sale
        items and personalized products. Once an order has been processed and marked delivered, no
        cancellations or modifications can be made. We encourage all customers to carefully review
        their orders prior to completing a purchase. In the event that you receive a damaged or
        defective item, please contact our support team within 48 hours of delivery, and we will
        assess the situation on a case-by-case basis.
      </Paragraph>

      <Heading variant="h3">Intellectual Property</Heading>
      <Paragraph>
        All content, including images, logos, and designs, are the property of Duftlab. Unauthorized
        use or reproduction is prohibited.
      </Paragraph>

      <Heading variant="h3">Limitation of Liability</Heading>
      <Paragraph>
        Duftlab is not responsible for any indirect or consequential damages resulting from the use
        of our products or services. We strive to provide accurate product descriptions, but we do
        not guarantee that all content on our site is error-free.
      </Paragraph>

      <Heading variant="h3">Privacy Policy</Heading>
      <Paragraph>
        Your personal information is handled in accordance with our Privacy Policy and will not be
        shared with third parties without consent.
      </Paragraph>

      <Heading variant="h3">Governing Law</Heading>

      <Paragraph>
        These terms and conditions are governed by the laws of Federal Republic of Nigeria. Any
        disputes will be resolved in accordance with these laws.
      </Paragraph>

      <Paragraph>
        For any questions regarding these terms, please contact our support team. We’re happy to
        assist you!
      </Paragraph>
      <Paragraph>
        Duftlab
        <br />
        <a href={siteLinks.email}>hello@duftlab.com</a>
        <br />
        duftlab.com
      </Paragraph>
    </div>
  );
}
