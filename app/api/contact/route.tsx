import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { firstName, lastName, email, company, phone, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email to your business email
    const { data: businessEmailData, error: businessEmailError } = await resend.emails.send({
      from: 'AI Marketing Partners <noreply@yourdomain.com>', // Replace with your verified domain
      to: ['support@aimarketingpartners.ai'], // Your business email
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #000000 0%, #333333 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">New Contact Form Submission</h1>
            <p style="color: #cccccc; margin: 10px 0 0 0; font-size: 16px;">AI Marketing Partners</p>
          </div>
          
          <div style="padding: 40px 30px; background-color: #ffffff;">
            <div style="background-color: #f8f9fa; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
              <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Contact Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; width: 120px;">Name:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Email:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">
                    <a href="mailto:${email}" style="color: #000000; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Company:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${company || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 600; color: #374151;">Phone:</td>
                  <td style="padding: 12px 0; color: #111827;">
                    ${phone ? `<a href="tel:${phone}" style="color: #000000; text-decoration: none;">${phone}</a>` : 'Not provided'}
                  </td>
                </tr>
              </table>
            </div>

            <div style="background-color: #f8f9fa; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
              <h2 style="color: #333333; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">Message</h2>
              <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #000000; font-size: 16px; line-height: 1.6; color: #374151;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>

            <div style="background-color: #000000; padding: 20px; border-radius: 8px; text-align: center;">
              <p style="color: white; margin: 0; font-size: 14px; font-weight: 600;">Next Steps</p>
              <p style="color: #cccccc; margin: 5px 0 0 0; font-size: 14px;">
                Respond within 24 hours • Set up consultation • Provide project proposal
              </p>
            </div>
          </div>

          <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-radius: 0 0 12px 12px;">
            <p style="margin: 0; font-size: 12px; color: #6b7280;">
              This email was sent from your AI Marketing Partners contact form
            </p>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #6b7280;">
              Submitted on: ${new Date().toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit',
                timeZoneName: 'short'
              })}
            </p>
          </div>
        </div>
      `,
    });

    if (businessEmailError) {
      console.error('Resend error (business email):', businessEmailError);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send confirmation email to the user
    const { data: confirmationEmailData, error: confirmationEmailError } = await resend.emails.send({
      from: 'AI Marketing Partners <noreply@yourdomain.com>', // Replace with your verified domain
      to: [email],
      subject: 'Thank you for contacting AI Marketing Partners',
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #000000 0%, #333333 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Thank You!</h1>
            <p style="color: #cccccc; margin: 10px 0 0 0; font-size: 16px;">We've received your message</p>
          </div>
          
          <div style="padding: 40px 30px; background-color: #ffffff;">
            <p style="font-size: 18px; color: #333333; margin: 0 0 20px 0; font-weight: 600;">
              Hi ${firstName},
            </p>
            
            <p style="font-size: 16px; line-height: 1.8; color: #374151; margin: 0 0 25px 0;">
              Thank you for reaching out to AI Marketing Partners. We've received your message and our team will get back to you within <strong>24 hours</strong>.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 12px; margin: 30px 0;">
              <h3 style="color: #333333; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Your Message:</h3>
              <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #000000; font-size: 14px; line-height: 1.6; color: #6b7280;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <p style="font-size: 16px; line-height: 1.8; color: #374151; margin: 25px 0;">
              In the meantime, feel free to explore our <a href="https://aimarketingpartners.ai/services" style="color: #000000; text-decoration: none; font-weight: 600;">services</a> or check out our latest <a href="https://aimarketingpartners.ai/case-studies" style="color: #000000; text-decoration: none; font-weight: 600;">case studies</a> to see how we've helped other businesses transform their marketing with AI.
            </p>
            
            <div style="background: linear-gradient(135deg, #000000 0%, #333333 100%); padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0;">
              <h3 style="margin: 0 0 10px 0; color: white; font-size: 20px; font-weight: 600;">Ready to Transform Your Marketing?</h3>
              <p style="margin: 0; color: #cccccc; font-size: 16px; line-height: 1.6;">
                Our AI experts are standing by to help you revolutionize your marketing strategy and drive unprecedented growth.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <h4 style="color: #333333; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Follow Us</h4>
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                Stay updated with the latest AI marketing trends and insights
              </p>
            </div>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <p style="margin: 0; color: #333333; font-size: 16px; font-weight: 600;">Contact Information</p>
            </div>
            <div style="text-align: center; color: #6b7280; font-size: 14px; line-height: 1.6;">
              <p style="margin: 0;">📧 support@aimarketingpartners.ai</p>
              <p style="margin: 5px 0;">📞 +1 (416) 230-7592</p>
              <p style="margin: 5px 0;">📍 Level 1, 11-15 Buckhurst St, South Melbourne VIC 3205, Australia</p>
              <p style="margin: 5px 0;">🕒 Mon-Fri: 9AM-6PM AEST</p>
            </div>
            <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                Best regards,<br>
                <strong>The AI Marketing Partners Team</strong>
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (confirmationEmailError) {
      console.error('Resend error (confirmation email):', confirmationEmailError);
      // Still return success as the main email was sent
    }

    return NextResponse.json(
      { 
        message: 'Email sent successfully',
        businessEmailId: businessEmailData?.id,
        confirmationEmailId: confirmationEmailData?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}