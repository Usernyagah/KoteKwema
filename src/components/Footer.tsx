const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="about" className="py-12 px-6 lg:px-12 bg-background border-t border-border">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-light tracking-wider">Architecture</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Creating innovative spaces that inspire and endure since 1995
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-light tracking-wide uppercase">Navigate</h4>
            <div className="flex flex-col gap-2">
              <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Projects
              </a>
              <a href="#expertise" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Expertise
              </a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                About
              </a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Contact
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-light tracking-wide uppercase">Follow</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Instagram
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                LinkedIn
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Twitter
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-light tracking-wide uppercase">Legal</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center font-light">
            © {currentYear} Architecture. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
