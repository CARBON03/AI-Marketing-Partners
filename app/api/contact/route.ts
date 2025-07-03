import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, message, phone, company } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email, and message' },
        { status: 400 }
      );
    }

    const name = `${firstName} ${lastName}`;

    // Send email to your business email
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use your verified domain
      to: ['mohnishsinghin@gmail.com'], // Your business email
      subject: `Ai Marketing Partners New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <p>This email was sent from your AI Marketing Partners contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send confirmation email to the user
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [email],
        subject: 'Thanks for contacting AI Marketing Partners!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; margin-bottom: 10px;">Thank You!</h1>
              <p style="color: #666; font-size: 16px;">We've received your message and will get back to you soon.</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Message Summary</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;">
                <p><strong>Your Message:</strong></p>
                <p style="font-style: italic; color: #666;">"${message}"</p>
              </div>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2d5a2d; margin-top: 0;">What's Next?</h3>
              <ul style="color: #2d5a2d; margin: 0; padding-left: 20px;">
                <li>Our team will review your message within 24 hours</li>
                <li>We'll reach out to discuss your AI marketing needs</li>
                <li>We'll provide a free consultation tailored to your business</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px;">
                Best regards,<br>
                <strong>The AI Marketing Partners Team</strong>
              </p>
              <p style="color: #999; font-size: 12px; margin-top: 10px;">
                This is an automated confirmation email. Please don't reply to this message.
              </p>
            </div>
          </div>
        `,
      });
    } catch (confirmationError) {
      console.error('Failed to send confirmation email:', confirmationError);
      // Don't fail the main request if confirmation email fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully! We\'ll get back to you within 24 hours.',
      data 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}