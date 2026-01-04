'use client'

import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-8 text-center">
            {t('about.title', 'About Driplare')}
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              {t('about.description1', 'Driplare is a leading AI solutions and software development company specializing in intelligent automation and custom MERN stack applications.')}
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              {t('about.description2', 'We architect autonomy through cutting-edge technology, helping businesses transform their operations with AI-powered solutions that work tirelessly to maximize productivity.')}
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">{t('about.missionTitle', 'Our Mission')}</h3>
                <p className="text-muted-foreground">
                  {t('about.missionDesc', 'To democratize access to enterprise-grade AI solutions and automation tools for businesses of all sizes.')}
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">{t('about.visionTitle', 'Our Vision')}</h3>
                <p className="text-muted-foreground">
                  {t('about.visionDesc', 'A world where every business can leverage AI to focus on what matters most - innovation and growth.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
