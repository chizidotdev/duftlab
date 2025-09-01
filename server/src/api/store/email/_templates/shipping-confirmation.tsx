import { Heading, Img, Section } from "@react-email/components";
import EmailBody from "./components/email-body";
import Layout from "./components/layout";
import { title } from "./components/style";

export default function ShippingConfirmation() {
  return (
    <Layout preview="Your fragrances have shipped - Duftlab">
      <Section className="w-full max-w-[565px] mb-16 px-5" align="left">
        <Img className="max-w-[200px]" src="https://duftlab.com/logo.svg" />
        <Heading className="mb-3 mt-16" style={title}>
          Your fragrances are on their way! 🚚
        </Heading>
        <EmailBody
          paragraphs={[
            "Exciting news! Your duftlab drops have been carefully packaged and shipped, and is now on its way to you.",
            // "Your authentic fragrances have been packaged with special care to ensure they arrive in perfect condition, ready for you to enjoy.",
            "If you have any questions about your delivery, please don't hesitate to contact us at hello@duftlab.com. We're always happy to help!",
            "We can't wait for you to experience your new signature scents. Thank you for choosing Duftlab!",
          ]}
          signature
        />
      </Section>
    </Layout>
  );
}
