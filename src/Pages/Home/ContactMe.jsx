export default function ContactMe() {
    return (
      <section id="Contact" className="contact--section">
        <div>
          <p className="sub--title">Get In Touch</p>
          <h2>Work With Me</h2>
          <p className="text-lg">
            Let's connect! Reach out to discuss projects, opportunities, or just say hi!
          </p>
        </div>
        <form action="https://formspree.io/f/xdaaeqpy" method="post" className="contact--form--container">
          <div className="container">
            <label htmlFor="first-name" className="contact--label">
              <span className="text-md">First Name</span>
              <input
                type="text"
                className="contact--input text-md"
                name="first-name"
                id="first-name"
                required
              />
            </label>
            <label htmlFor="last-name" className="contact--label">
              <span className="text-md">Last Name</span>
              <input
                type="text"
                className="contact--input text-md"
                name="last-name"
                id="last-name"
                required
              />
            </label>
            <label htmlFor="email" className="contact--label">
              <span className="text-md">Email</span>
              <input
                type="email"
                className="contact--input text-md"
                name="email"
                id="email"
                required
              />
            </label>
            <label htmlFor="phone-number" className="contact--label">
              <span className="text-md">Phone Number</span>
              <input
                type="tel"
                className="contact--input text-md"
                name="phone-number"
                id="phone-number"
              />
            </label>
          </div>
          <label htmlFor="choose-topic" className="contact--label">
            <span className="text-md">Choose a topic</span>
            <select id="choose-topic" name="choose-topic" className="contact--input text-md">
              <option>Select One...</option>
              <option>Job Opportunity</option>
              <option>Internship Opportunity</option>
              <option>Collaboration</option>
              <option>Other</option>
            </select>
          </label>
          <label htmlFor="message" className="contact--label">
            <span className="text-md">Message</span>
            <textarea
              className="contact--input text-md"
              id="message"
              name="message"
              rows="8"
              placeholder="Type your message..."
              required
            />
          </label>
          <div>
            <button className="btn btn-primary" type="submit">Submit</button>
          </div>
        </form>
      </section>
    );
  }
