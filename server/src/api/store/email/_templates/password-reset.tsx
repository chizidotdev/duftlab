import { Img, Section, Text } from "@react-email/components";
import { CtaButton } from "./components/button";
import EmailBody from "./components/email-body";
import Layout from "./components/layout";
import { body } from "./components/style";

interface ResetPasswordEmailProps {
  resetPasswordLink: string;
}

export const ResetPasswordEmail = ({
  resetPasswordLink,
}: ResetPasswordEmailProps) => {
  return (
    <Layout preview="Reset your Duftlab password">
      <Section className="w-full px-5 mt-5 mb-12" align="left">
        <Img
          className="max-w-[200px] mb-20"
          src="https://duftlab.com/logo-mark.png"
          alt="Duftlab"
        />
        <EmailBody
          paragraphs={[
            "Someone recently requested a password change for your Duftlab account. If this was you, you can set a new password here:",
          ]}
        />
        <CtaButton label="Reset Password" href={resetPasswordLink} />
        <Text style={body} className="mb-[50px]">
          If you don&apos;t want to change your password or didn&apos;t request
          this, just ignore and delete this message.
          <br />
          To keep your account secure, please don&apos;t forward this email to
          anyone. This link will expire in 24 hours for your security.
          <br />
          <br />
          The Duftlab Team.
        </Text>
        <br /> <br />
      </Section>
    </Layout>
  );
};

export default ResetPasswordEmail;
