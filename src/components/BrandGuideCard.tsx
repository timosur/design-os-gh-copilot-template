import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/EmptyState'
import type { BrandGuide } from '@/types/product'
import { getBrandResourceFiles, hasBrandResources } from '@/lib/brand-guide-loader'
import { FileImage, FileText, Type, Palette } from 'lucide-react'

interface BrandGuideCardProps {
  brandGuide: BrandGuide | null
}

// Categorize resource files by type
function categorizeResources(files: string[]): {
  images: string[]
  documents: string[]
  fonts: string[]
  other: string[]
} {
  const categories = {
    images: [] as string[],
    documents: [] as string[],
    fonts: [] as string[],
    other: [] as string[],
  }

  for (const file of files) {
    const ext = file.split('.').pop()?.toLowerCase() || ''
    if (['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'].includes(ext)) {
      categories.images.push(file)
    } else if (['pdf', 'md', 'txt', 'doc', 'docx'].includes(ext)) {
      categories.documents.push(file)
    } else if (['ttf', 'otf', 'woff', 'woff2'].includes(ext)) {
      categories.fonts.push(file)
    } else {
      categories.other.push(file)
    }
  }

  return categories
}

export function BrandGuideCard({ brandGuide }: BrandGuideCardProps) {
  const resourceFiles = getBrandResourceFiles()
  const hasResources = hasBrandResources()
  const categories = categorizeResources(resourceFiles)

  // Empty state - no brand guide created
  if (!brandGuide) {
    return <EmptyState type="brand-guide" />
  }

  return (
    <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Brand Guide
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            Optional
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Brand Personality */}
        {brandGuide.personality && (
          <div>
            <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-3">
              Brand Personality
            </h4>
            <div className="flex flex-wrap gap-2 mb-2">
              {brandGuide.personality.adjectives?.map((adj, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {adj}
                </Badge>
              ))}
            </div>
            {brandGuide.personality.mood && (
              <p className="text-sm text-stone-600 dark:text-stone-400">
                {brandGuide.personality.mood}
              </p>
            )}
          </div>
        )}

        {/* Brand Voice */}
        {brandGuide.voice && (
          <div>
            <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-3">
              Brand Voice
            </h4>
            <p className="text-sm text-stone-700 dark:text-stone-300 font-medium mb-2">
              {brandGuide.voice.tone}
            </p>
            <div className="flex flex-wrap gap-2">
              {brandGuide.voice.characteristics?.map((char, i) => (
                <span
                  key={i}
                  className="text-xs text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded"
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Color Recommendations */}
        {brandGuide.colors && (
          <div>
            <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-3">
              Color Recommendations
            </h4>
            <div className="space-y-2">
              {brandGuide.colors.primary && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <Palette className="w-3.5 h-3.5 text-stone-400" />
                    <span className="text-xs text-stone-500 dark:text-stone-400">Primary</span>
                  </div>
                  <code className="text-sm font-mono text-stone-700 dark:text-stone-300">
                    {brandGuide.colors.primary.name}
                  </code>
                </div>
              )}
              {brandGuide.colors.secondary && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <Palette className="w-3.5 h-3.5 text-stone-400" />
                    <span className="text-xs text-stone-500 dark:text-stone-400">Secondary</span>
                  </div>
                  <code className="text-sm font-mono text-stone-700 dark:text-stone-300">
                    {brandGuide.colors.secondary.name}
                  </code>
                </div>
              )}
              {brandGuide.colors.neutral && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <Palette className="w-3.5 h-3.5 text-stone-400" />
                    <span className="text-xs text-stone-500 dark:text-stone-400">Neutral</span>
                  </div>
                  <code className="text-sm font-mono text-stone-700 dark:text-stone-300">
                    {brandGuide.colors.neutral.name}
                  </code>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Typography Recommendations */}
        {brandGuide.typography && (
          <div>
            <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-3">
              Typography Recommendations
            </h4>
            <div className="space-y-2">
              {brandGuide.typography.heading && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <Type className="w-3.5 h-3.5 text-stone-400" />
                    <span className="text-xs text-stone-500 dark:text-stone-400">Heading</span>
                  </div>
                  <span className="text-sm text-stone-700 dark:text-stone-300">
                    {brandGuide.typography.heading.font}
                  </span>
                </div>
              )}
              {brandGuide.typography.body && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <Type className="w-3.5 h-3.5 text-stone-400" />
                    <span className="text-xs text-stone-500 dark:text-stone-400">Body</span>
                  </div>
                  <span className="text-sm text-stone-700 dark:text-stone-300">
                    {brandGuide.typography.body.font}
                  </span>
                </div>
              )}
              {brandGuide.typography.mono && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <Type className="w-3.5 h-3.5 text-stone-400" />
                    <span className="text-xs text-stone-500 dark:text-stone-400">Mono</span>
                  </div>
                  <span className="text-sm font-mono text-stone-700 dark:text-stone-300">
                    {brandGuide.typography.mono.font}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* UI Style Preferences */}
        {brandGuide.uiStyle && (
          <div>
            <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-3">
              UI Style
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {brandGuide.uiStyle.borderRadius && (
                <div className="bg-stone-50 dark:bg-stone-800/50 rounded px-3 py-2">
                  <p className="text-xs text-stone-500 dark:text-stone-400 mb-0.5">Radius</p>
                  <p className="text-sm text-stone-700 dark:text-stone-300">{brandGuide.uiStyle.borderRadius}</p>
                </div>
              )}
              {brandGuide.uiStyle.shadows && (
                <div className="bg-stone-50 dark:bg-stone-800/50 rounded px-3 py-2">
                  <p className="text-xs text-stone-500 dark:text-stone-400 mb-0.5">Shadows</p>
                  <p className="text-sm text-stone-700 dark:text-stone-300">{brandGuide.uiStyle.shadows}</p>
                </div>
              )}
              {brandGuide.uiStyle.density && (
                <div className="bg-stone-50 dark:bg-stone-800/50 rounded px-3 py-2">
                  <p className="text-xs text-stone-500 dark:text-stone-400 mb-0.5">Density</p>
                  <p className="text-sm text-stone-700 dark:text-stone-300">{brandGuide.uiStyle.density}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Brand Resources */}
        {hasResources && (
          <div>
            <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-3">
              Source Resources
            </h4>
            <div className="flex flex-wrap gap-4 text-xs text-stone-500 dark:text-stone-400">
              {categories.images.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <FileImage className="w-3.5 h-3.5" />
                  <span>{categories.images.length} image{categories.images.length !== 1 ? 's' : ''}</span>
                </div>
              )}
              {categories.documents.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>{categories.documents.length} document{categories.documents.length !== 1 ? 's' : ''}</span>
                </div>
              )}
              {categories.fonts.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5" />
                  <span>{categories.fonts.length} font{categories.fonts.length !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit hint */}
        <div className="bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5">
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Use the <code className="font-mono text-stone-700 dark:text-stone-300">@brand-guide</code> agent to update
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
