import {
  Column,
  Link,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { footer } from "./style";

const getYear = () => {
  const date = new Date();
  return date.getFullYear();
};
export default function Footer() {
  const year = getYear();

  return (
    <Section className="bg-accent text-background">
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                background: "#F8F9FA",
                accent: "#1F1F1F",
                secondary: "#6B7280",
              },
            },
          },
        }}
      >
        <Section className="mx-auto my-10 w-fit text-background ">
          <Row>
            <Column className="pr-12" align="center">
              <Link
                href="https://www.instagram.com/duftlabdrops"
                className="text-background uppercase"
                style={footer}
              >
                INSTAGRAM
              </Link>
            </Column>

            <Column className="pr-0" align="center">
              <Link
                href="https://duftlab.com"
                className="text-background uppercase"
                style={footer}
              >
                WEBSITE
              </Link>
            </Column>
            {/* <Column className="pr-0" align="center">
              <Link
                href="/"
                className="text-background uppercase"
                style={footer}
              >
                LINKEDIN
              </Link>
            </Column> */}
          </Row>
        </Section>

        <Section className="text-center">
          <Text style={footer} className="pb-5">
            © {year} DUFTLAB
          </Text>
        </Section>
      </Tailwind>
    </Section>
  );
}
