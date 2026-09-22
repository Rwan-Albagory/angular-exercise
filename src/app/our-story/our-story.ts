import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Milestone {
  year: string;
  en: string;
ar: string;
}

interface Value {
  en: string;
  ar: string;
  description: string;
}

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'app-our-story',
  templateUrl: './our-story.html',
})
export class OurStory {
  readonly milestones: Milestone[] = [
    { year: '2015', en: 'A single workbench', ar: 'بداية صغيرة', },
    { year: '2018', en: 'First atelier in Cairo', ar: 'أول ورشة في القاهرة' },
    { year: '2021', en: 'Certified 18K gold line', ar: 'خط الذهب عيار ١٨ المعتمد' },
    { year: '2025', en: 'Handmade, still by hand', ar: 'صناعة يدوية حتى اليوم' },
  ];

  readonly values: Value[] = [
    {
      en: 'Handcrafted',
      ar: 'صناعة يدوية',
      description: 'Every piece passes through a goldsmith’s hands, not a factory line.',
    },
    {
      en: 'Honest materials',
      ar: 'مواد أصيلة',
      description: 'Certified 18K gold and ethically sourced stones, always disclosed.',
    },
    {
      en: 'Made to last',
      ar: 'تدوم طويلاً',
      description: 'Checked by hand before it ships, so it looks as good in ten years.',
    },
  ];
}