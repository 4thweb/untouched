"use client"

import { useEffect, useState } from "react"
import { ArrowRight, CheckCircle, ChevronRight, MessageSquare, Shield, Sparkles, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import UntouchableButton from "@/components/untouchable-button"
import UntouchableLink from "@/components/untouchable-link"
import { useTheme } from "next-themes"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Set theme to dark by default and ensure it's applied immediately
    document.documentElement.classList.add("dark")
    setTheme("dark")
  }, [setTheme])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 max-w-[100vw] overflow-hidden dark:text-gray-100">
      {/* Navigation */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm" : "bg-transparent dark:bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">U</div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Untouched
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <UntouchableLink
              href="#"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Home
            </UntouchableLink>
            <UntouchableLink
              href="#features"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Features
            </UntouchableLink>
            <UntouchableLink
              href="#pricing"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Pricing
            </UntouchableLink>
            <UntouchableLink
              href="#contact"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Contact
            </UntouchableLink>
          </nav>
          <div className="flex items-center gap-4">
            {mounted && (
              <UntouchableButton variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="sr-only">Toggle theme</span>
              </UntouchableButton>
            )}
            <UntouchableButton className="hidden md:flex">Sign In</UntouchableButton>
            <UntouchableButton variant="default" className="hidden md:flex">
              Get Started
            </UntouchableButton>
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 opacity-70"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-300/20 to-purple-300/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="container relative z-10">
          <div className="grid gap-12 items-center">
            <div className="space-y-12 text-center">
              <div>
                <h1 className="text-6xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
                  Your Solution, Out of Reach
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                  Experience the frustration of innovation that's always just beyond your grasp. The more you want it,
                  the further it goes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <UntouchableButton size="lg" className="relative group">
                  <span>Get Started</span>
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </UntouchableButton>
                <UntouchableButton size="lg" variant="outline" className="relative">
                  Learn More
                </UntouchableButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-white to-blue-50/50 dark:from-black dark:to-blue-950/20"
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Features You'll Never Experience
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform offers a wide range of capabilities that will forever remain just out of your reach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="h-10 w-10 text-blue-500" />,
                title: "AI-Powered Insights",
                description:
                  "Advanced analytics that adapt to your business needs, providing actionable intelligence you'll never be able to use.",
              },
              {
                icon: <Shield className="h-10 w-10 text-purple-500" />,
                title: "Enterprise Security",
                description:
                  "Military-grade encryption and compliance features that keep your data safe, if only you could access them.",
              },
              {
                icon: <MessageSquare className="h-10 w-10 text-blue-500" />,
                title: "Seamless Collaboration",
                description:
                  "Real-time communication tools that would revolutionize how your team works, if they weren't untouchable.",
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-purple-500" />,
                title: "Automated Workflows",
                description:
                  "Streamline your processes with automation that's perpetually just beyond your fingertips.",
              },
              {
                icon: <ArrowRight className="h-10 w-10 text-blue-500" />,
                title: "Scalable Infrastructure",
                description:
                  "Grow without limits on our platform that scales with your needs, always tantalizingly out of reach.",
              },
              {
                icon: <Sparkles className="h-10 w-10 text-purple-500" />,
                title: "Custom Integrations",
                description:
                  "Connect with thousands of apps and services in our ecosystem that you'll never quite be able to configure.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border border-blue-100 dark:border-blue-900 bg-white/80 dark:bg-black/80 backdrop-blur-sm hover:shadow-md transition-all duration-300"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-100/40 to-purple-100/40 dark:from-blue-700/20 dark:to-purple-700/20 blur-2xl group-hover:opacity-70 transition-opacity"></div>
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-400">{feature.description}</CardDescription>
                  <UntouchableButton
                    variant="ghost"
                    className="mt-4 text-blue-600 dark:text-blue-400 p-0 h-auto font-medium"
                  >
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </UntouchableButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-black">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              What Our Clients Would Say
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              If they could actually use our product, here's what they might tell you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO at Imaginary Inc",
                image: "/placeholder.svg?height=100&width=100",
                quote:
                  "Untouched has completely transformed how we approach our business operations. If only we could click the buttons!",
              },
              {
                name: "Michael Chen",
                role: "CTO at Nonexistent Labs",
                quote:
                  "The security features alone would be worth the investment, if we could actually implement them. So close, yet so far!",
              },
              {
                name: "Emma Rodriguez",
                role: "Marketing Director",
                image: "/placeholder.svg?height=100&width=100",
                quote:
                  "I've never been so frustrated yet impressed by a product. It's like seeing the future but not being able to touch it.",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border border-blue-100 dark:border-blue-900 bg-white/80 dark:bg-black/80 backdrop-blur-sm"
              >
                <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-gradient-to-br from-purple-100/40 to-blue-100/40 dark:from-purple-700/20 dark:to-blue-700/20 blur-2xl"></div>
                <CardContent className="pt-6">
                  <div className="mb-4 text-gray-700 dark:text-gray-300 italic">"{testimonial.quote}"</div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 bg-gradient-to-b from-white to-blue-50/50 dark:from-black dark:to-blue-950/20"
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the plan that's right for your business. If only you could select one.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                description: "Perfect for small teams just getting started",
                features: ["Up to 5 team members", "Basic analytics", "24-hour support", "10GB storage"],
              },
              {
                name: "Professional",
                price: "$79",
                description: "Ideal for growing businesses",
                features: [
                  "Up to 20 team members",
                  "Advanced analytics",
                  "Priority support",
                  "50GB storage",
                  "Custom integrations",
                ],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "$199",
                description: "For large organizations with complex needs",
                features: [
                  "Unlimited team members",
                  "AI-powered insights",
                  "24/7 dedicated support",
                  "500GB storage",
                  "Custom integrations",
                  "Advanced security",
                ],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden ${
                  plan.highlighted
                    ? "border-blue-200 dark:border-blue-700 shadow-lg"
                    : "border border-blue-100 dark:border-blue-900"
                } bg-white/80 dark:bg-black/80 backdrop-blur-sm`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium py-1 text-center">
                    Most Popular
                  </div>
                )}
                <CardHeader className={plan.highlighted ? "pt-8" : ""}>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400">/month</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <UntouchableButton className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                    Get Started
                  </UntouchableButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-black"
      >
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Get in Touch
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Have questions about our unreachable product? Our team is here to not help you.
              </p>
            </div>

            <Card className="relative overflow-hidden border border-blue-100 dark:border-blue-900 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
              <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-gradient-to-br from-blue-100/40 to-purple-100/40 dark:from-blue-700/20 dark:to-purple-700/20 blur-3xl"></div>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      id="subject"
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder="Your message..."
                    />
                  </div>
                  <UntouchableButton className="w-full md:w-auto">Send Message</UntouchableButton>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-b from-white to-blue-50/30 dark:from-black dark:to-blue-950/10">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">U</div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Untouched
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                The solution you can see but never reach. Frustratingly beautiful and forever out of grasp.
              </p>
              <div className="flex gap-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <UntouchableButton key={social} variant="ghost" size="icon" className="h-8 w-8">
                    <span className="sr-only">{social}</span>
                    <div className="h-4 w-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                  </UntouchableButton>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Testimonials", "FAQ"],
              },
              {
                title: "Company",
                links: ["About", "Team", "Careers", "Press"],
              },
              {
                title: "Resources",
                links: ["Blog", "Documentation", "Support", "Contact"],
              },
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-medium mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <UntouchableLink
                        href="#"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        {link}
                      </UntouchableLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Untouched. All rights reserved.
            </p>
            <div className="flex gap-6">
              <UntouchableLink
                href="#"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Privacy Policy
              </UntouchableLink>
              <UntouchableLink
                href="#"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Terms of Service
              </UntouchableLink>
              <UntouchableLink
                href="#"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Cookies
              </UntouchableLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
