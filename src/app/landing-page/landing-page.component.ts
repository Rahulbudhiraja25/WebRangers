import { AfterViewInit, Component, inject, Renderer2 } from '@angular/core';

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements AfterViewInit {
  private readonly renderer = inject(Renderer2);
  private toastTimeoutId: ReturnType<typeof setTimeout> | null = null;

  readonly formspreeEndpoint = 'https://formspree.io/f/xwvrqgbr';
  isSubmitting = false;
  submissionToast: { type: 'success' | 'error'; message: string } | null = null;

  readonly navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Founder Reel', href: '#founder-reel' },
    { label: 'Contact', href: '#contact' }
  ];

  readonly hero = {
    location: 'Rohtak | Haryana | NCR',
    title: 'Digital Presence That Makes Local Businesses Look Bigger, Better, and Easier to Trust.',
    description:
      'Web Rangers helps local brands move from offline goodwill to strong online recall with reels, poster design, Google visibility, ad campaigns, and websites built to generate real enquiries.',
    primaryCta: {
      label: 'View Instagram',
      href: 'https://www.instagram.com/theweb_rangers/'
    },
    secondaryCta: {
      label: 'See Our Work',
      href: '#work'
    },
    highlights: [
      'Reels that stop the scroll',
      'Poster creatives that feel campaign-ready',
      'Ads and websites built for enquiries'
    ]
  };

  readonly heroStats = [
    {
      value: '6',
      label: 'growth services handled by one creative-first team'
    },
    {
      value: 'Local',
      label: 'market understanding shaped for Rohtak, Haryana, and NCR businesses'
    }
  ];

  readonly servicesIntro = {
    eyebrow: 'What We Build',
    title: 'Everything a growing business needs to look serious online.',
    description:
      'We do not just make posts. We shape how your business is seen, remembered, and contacted across social media, Google, and your website.'
  };

  readonly services = [
    {
      number: '01',
      title: 'Reels Shooting',
      description: 'Short-form content planned and shot to make your business look active, relevant, and worth noticing.'
    },
    {
      number: '02',
      title: 'Poster Design',
      description: 'Campaign posters and social creatives that make your offers, products, and brand visuals feel sharper and more premium.'
    },
    {
      number: '03',
      title: 'Google Business Listing',
      description: 'Local search visibility that helps nearby customers discover your business with more trust and clarity.'
    },
    {
      number: '04',
      title: 'Social Media Ads',
      description: 'Paid campaigns designed to get attention, build demand, and drive quality leads from the right audience.'
    },
    {
      number: '05',
      title: 'Google Ads',
      description: 'Intent-driven ad campaigns for businesses that want enquiries from people already searching for solutions.'
    },
    {
      number: '06',
      title: 'Website Creation',
      description: 'Clean, mobile-first websites that help your business look premium and convert visits into enquiries.'
    },
     {
      number: '07',
      title: 'Others',
      description: 'Others unlisted'
    }
  ];

  readonly positioning = {
    eyebrow: 'Why Web Rangers',
    title: 'Built for businesses that already deliver quality offline and now want the internet to reflect it.',
    description:
      'A lot of local businesses already have trust in the market. What they need is a better digital face. That is where Web Rangers steps in with local understanding, stronger presentation, and growth-focused execution.'
  };

  readonly positioningPoints = [
    {
      title: 'Local market understanding',
      description: 'We create with the language, tone, and buyer behaviour of Rohtak and Haryana in mind.'
    },
    {
      title: 'Creative that feels premium',
      description: 'Your reels, posters, ads, and website should look polished enough to raise brand confidence instantly.'
    },
    {
      title: 'One team, one direction',
      description: 'Instead of scattered execution, you get one growth partner for content, visibility, and conversion.'
    }
  ];

  readonly agencySnapshot = [
    'For local businesses ready to look stronger online',
    'Creative, ads, and website execution under one brand',
    'Focused on digital growth that feels clear and market-ready'
  ];

  readonly founderSection = {
    reel: {
      permalink: 'https://www.instagram.com/reel/DVl1y-UkwZb/?utm_source=ig_embed&utm_campaign=loading'
    }
  };

  readonly workSection = {
    eyebrow: 'Creative Work',
    title: 'Client creatives designed to stay memorable long after the first glance.',
    description:
      'Poster design is one of the fastest ways to make a business look active, professional, and campaign-ready. These are real creatives built for local food and product brands.'
  };

  readonly posters = [
    {
      category: 'Food Campaign Poster',
      title: 'Do Bhai campaign creative',
      description: 'Character-led food visual designed to make the brand feel playful, local, and highly recallable.',
      image: 'assets/post1.PNG',
      alt: 'Do Bhai creative poster featuring Rabdi and Jalebi themed illustration'
    },
    {
      category: 'Festive Sweet Creative',
      title: 'Do Bhai halwa poster',
      description: 'Regional-language poster creative crafted to make the product feel festive, fun, and instantly eye-catching.',
      image: 'assets/post2.PNG',
      alt: 'Do Bhai halwa poster with illustrated festive character and halwa pan'
    },
    {
      category: 'Product Visual',
      title: 'RS Gau Grit product design',
      description: 'Packaging-focused product poster built to feel clean, premium, and shelf-ready for an organic brand.',
      image: 'assets/post4.png',
      alt: 'RS Gau Grit organic product poster with jar packaging on yellow background'
    }
  ];

  readonly processSection = {
    eyebrow: 'How We Work',
    title: 'Simple execution that moves from brand clarity to digital growth.'
  };

  readonly processSteps = [
    {
      number: '01',
      title: 'Understand the business',
      description: 'We start with what you sell, who you want to reach, and how your brand should be perceived online.'
    },
    {
      number: '02',
      title: 'Create the right assets',
      description: 'We build the reels, posters, ad creatives, and web presence your business actually needs right now.'
    },
    {
      number: '03',
      title: 'Launch with clarity',
      description: 'Everything goes live with a cleaner brand story, stronger visual identity, and sharper call-to-action.'
    },
    {
      number: '04',
      title: 'Scale what works',
      description: 'Once attention starts coming in, we refine the assets and campaigns that push better response.'
    }
  ];

  ngAfterViewInit(): void {
    if (window.instgrm?.Embeds) {
      this.processInstagramEmbeds();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-instgrm-embed]');
    if (existingScript) {
      existingScript.addEventListener('load', () => this.processInstagramEmbeds(), { once: true });
      return;
    }

    const script = this.renderer.createElement('script');
    script.async = true;
    script.src = 'https://www.instagram.com/embed.js';
    script.setAttribute('data-instgrm-embed', 'true');
    script.addEventListener('load', () => this.processInstagramEmbeds(), { once: true });
    this.renderer.appendChild(document.body, script);
  }

  async submitContactForm(event: Event): Promise<void> {
    event.preventDefault();

    if (this.isSubmitting) {
      return;
    }

    const form = event.target as HTMLFormElement | null;
    if (!form) {
      return;
    }

    this.normalizeFormFields(form);

    if (!this.validateForm(form)) {
      return;
    }

    this.isSubmitting = true;

    try {
      const response = await fetch(this.formspreeEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      form.reset();
      this.showToast('success', 'Thanks for reaching out. We will get back to you shortly.');
    } catch {
      this.showToast('error', 'Something went wrong while sending your enquiry. Please try again.');
    } finally {
      this.isSubmitting = false;
    }
  }

  private showToast(type: 'success' | 'error', message: string): void {
    this.submissionToast = { type, message };

    if (this.toastTimeoutId) {
      clearTimeout(this.toastTimeoutId);
    }

    this.toastTimeoutId = setTimeout(() => {
      this.submissionToast = null;
      this.toastTimeoutId = null;
    }, 4000);
  }

  private processInstagramEmbeds(): void {
    window.instgrm?.Embeds?.process();
  }

  private normalizeFormFields(form: HTMLFormElement): void {
    const textFields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[type="text"], input[type="tel"], input[type="email"], textarea');
    for (const field of textFields) {
      field.value = field.value.trim();
    }
  }

  private validateForm(form: HTMLFormElement): boolean {
    const requiredFields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      'input[required], textarea[required], select[required]'
    );

    for (const field of requiredFields) {
      const value = field.value.trim();

      if (field instanceof HTMLSelectElement) {
        field.setCustomValidity(value ? '' : 'Please select a service.');
        continue;
      }

      if (!value) {
        field.setCustomValidity('This field is required.');
      } else {
        field.setCustomValidity('');
      }
    }

    const isValid = form.reportValidity();

    if (!isValid) {
      this.showToast('error', 'Please fill all required fields before submitting.');
    }

    return isValid;
  }

  resetFieldValidity(event: Event): void {
    const field = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    if (!field) {
      return;
    }

    field.setCustomValidity('');
  }
}
