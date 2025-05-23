import { useState } from 'react'
import './Contact.scss'

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formspree.io/f/xzzrqkrd', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Thanks for your message! I\'ll get back to you soon.')
        form.reset()
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Oops! There was a problem submitting your form. Please try again.')
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="container--normal">
        <h2>Get in Touch</h2>
        <form onSubmit={handleSubmit} className="contact__form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="your.email@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="Your message"
              rows={5}
            />
          </div>
          <button
            type="submit"
            className="button button--primary"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
          {message && (
            <div className={`form-message ${status}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact