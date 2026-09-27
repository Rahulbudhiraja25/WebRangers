import { Component, HostListener } from '@angular/core';

@Component({ selector: 'app-landing-page', imports: [], templateUrl: './landing-page.component.html', styleUrl: './landing-page.component.scss' })
export class LandingPageComponent {
  readonly whatsappUrl = 'https://wa.me/919996526128?text=Hi%2C%20I%20want%20to%20grow%20my%20business%20with%20Web%20Rangers';
  readonly instagramUrl = 'https://www.instagram.com/theweb_rangers/';
  readonly primaryPhone = '+919996526128'; readonly displayPhone = '+91 99965 26128'; readonly formspreeEndpoint = 'https://formspree.io/f/xwvrqgbr';
  menuOpen = false; isScrolled = false; isSubmitting = false; submissionToast: { type: 'success' | 'error'; message: string } | null = null;
  readonly navLinks = [{ label: 'Services', href: '#services' }, { label: 'Work', href: '#work' }, { label: 'About', href: '#about' }, { label: 'Contact', href: '#contact' }];
  readonly pillars = [
    { number: '01', name: 'Marketing', lead: 'Make attention mean something.', services: ['Meta Ads', 'Social Media', 'SEO', 'Digital Business Support'], description: 'Campaigns and strategy that put the right message in front of the right people.' },
    { number: '02', name: 'Creative', lead: 'Give people a reason to stop.', services: ['Content Creation', 'Video & Reels', 'Documentary & Films', 'Brand Storytelling'], description: 'Ideas, visual stories and social-first content built to be remembered.' },
    { number: '03', name: 'Technology', lead: 'Turn presence into progress.', services: ['Website Development', 'App Development', 'Digital Solutions'], description: 'Fast, thoughtful digital products made around real business needs.' }
  ];
  readonly work = [
    { category: 'Creative Campaign', title: 'Food that feels familiar.', image: 'assets/post1.PNG', alt: 'Do Bhai campaign creative designed by Web Rangers' },
    { category: 'Festive Content', title: 'A moment made memorable.', image: 'assets/post2.PNG', alt: 'Festive halwa creative designed by Web Rangers' },
    { category: 'Product Visual', title: 'Shelf presence, online.', image: 'assets/post4.png', alt: 'RS Gau Grit product visual designed by Web Rangers' }
  ];
  readonly principles = [['01', 'Think different', 'No two businesses need the same digital playbook.'], ['02', 'Create with purpose', 'Every campaign, cut and page needs a reason to exist.'], ['03', 'Build for growth', 'Good work should move a real business goal forward.'], ['04', 'One team', 'Marketing, content and technology work better together.']];
  readonly process = [['01', 'Discover', 'Understand the business, audience and goal.'], ['02', 'Strategize', 'Find the right marketing and creative direction.'], ['03', 'Create', 'Design, develop, shoot, edit and execute.'], ['04', 'Grow', 'Launch, learn, refine and keep moving.']];
  @HostListener('window:scroll') onScroll(): void { this.isScrolled = window.scrollY > 20; }
  toggleMenu(): void { this.menuOpen = !this.menuOpen; } closeMenu(): void { this.menuOpen = false; }
  async submitContactForm(event: Event): Promise<void> { event.preventDefault(); const form = event.target as HTMLFormElement; if (this.isSubmitting || !form.reportValidity()) return; this.isSubmitting = true; try { const response = await fetch(this.formspreeEndpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } }); if (!response.ok) throw new Error('Submission failed'); form.reset(); this.submissionToast = { type: 'success', message: 'Thanks. We will get back to you shortly.' }; } catch { this.submissionToast = { type: 'error', message: 'Something went wrong. Please try WhatsApp or call us.' }; } finally { this.isSubmitting = false; setTimeout(() => this.submissionToast = null, 4000); } }
}
