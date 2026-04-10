export interface CmsSection {
  id?: string
  section_key: string
  section_type: string
  content: Record<string, unknown> | null
  position?: number
  is_active?: boolean
  status?: string
}

function normalizeToken(value: unknown) {
  return typeof value === 'string'
    ? value.toLowerCase().trim().replace(/\s+/g, '_').replace(/-/g, '_')
    : ''
}

function hasNonEmptyString(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0
}

function isSectionMatch(section: CmsSection, target: 'hero' | 'story' | 'values' | 'team' | 'cta' | 'contact_info') {
  const type = normalizeToken(section.section_type)
  const key = normalizeToken(section.section_key)
  const content = section.content ?? {}

  if (target === 'hero') {
    return type === 'hero' || type === 'banner' || key.includes('hero') || key.includes('banner')
  }

  if (target === 'story') {
    return type === 'story' || type === 'historia' || key.includes('story') || key.includes('historia')
  }

  if (target === 'values') {
    return type === 'values' || type === 'valores' || key.includes('values') || key.includes('valor')
  }

  if (target === 'team') {
    const hasMembersArray = Array.isArray(content.members)
    const hasLegacyMembers = hasNonEmptyString(content.member_1_name) || hasNonEmptyString(content.member_2_name) || hasNonEmptyString(content.member_3_name)
    return type === 'team' || type === 'equipe' || key.includes('team') || key.includes('equipe') || hasMembersArray || hasLegacyMembers
  }

  if (target === 'cta') {
    return type === 'cta' || key.includes('cta') || key.includes('whatsapp')
  }

  if (target === 'contact_info') {
    const hasContactFields = hasNonEmptyString(content.phone) || hasNonEmptyString(content.email) || hasNonEmptyString(content.address) || hasNonEmptyString(content.whatsapp) || hasNonEmptyString(content.map_url)
    return type === 'contact_info' || type === 'contact' || type === 'contato' || key.includes('contact') || key.includes('contato') || key.includes('mapa') || hasContactFields
  }

  return false
}

function setIfString(map: Record<string, string>, key: string, value: unknown) {
  if (typeof value === 'string' && value.trim().length > 0) {
    map[key] = value
  }
}

function firstString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim().length > 0) {
      return value
    }
  }
  return undefined
}

function copyLegacyShapedContent(map: Record<string, string>, content: Record<string, unknown>) {
  Object.entries(content).forEach(([key, value]) => {
    if (typeof value === 'string' && value.trim().length > 0) {
      map[key] = value
    }
  })
}

function mapHomeSection(map: Record<string, string>, section: CmsSection) {
  const content = section.content ?? {}
  copyLegacyShapedContent(map, content)

  if (isSectionMatch(section, 'hero')) {
    setIfString(map, 'hero_badge', content.badge)
    setIfString(map, 'hero_title', content.title)
    setIfString(map, 'hero_subtitle', content.subtitle)
    setIfString(map, 'hero_background_image', firstString(content.backgroundImage, content.background_image))
    setIfString(map, 'hero_btn_primary', firstString(content.primaryButtonText, content.primary_button_text))
    setIfString(map, 'hero_btn_secondary', firstString(content.secondaryButtonText, content.secondary_button_text))

    const stats = Array.isArray(content.stats) ? content.stats : []
    stats.slice(0, 4).forEach((item, index) => {
      if (item && typeof item === 'object') {
        const stat = item as Record<string, unknown>
        setIfString(map, `hero_stat${index + 1}_value`, stat.value)
        setIfString(map, `hero_stat${index + 1}_label`, stat.label)
      }
    })
  }

  if (section.section_type === 'featured_properties') {
    setIfString(map, 'destaques_label', content.label)
    setIfString(map, 'destaques_title', content.title)
    setIfString(map, 'destaques_subtitle', content.subtitle)
    setIfString(map, 'destaques_btn', firstString(content.buttonText, content.button_text))
  }

  if (section.section_type === 'differentials') {
    setIfString(map, 'diferenciais_label', content.label)
    setIfString(map, 'diferenciais_title', content.title)
    setIfString(map, 'diferenciais_subtitle', content.subtitle)

    const items = Array.isArray(content.items) ? content.items : []
    items.slice(0, 6).forEach((item, index) => {
      if (item && typeof item === 'object') {
        const differential = item as Record<string, unknown>
        setIfString(map, `diferenciais_${index + 1}_title`, differential.title)
        setIfString(map, `diferenciais_${index + 1}_desc`, differential.description)
      }
    })
  }

  if (isSectionMatch(section, 'cta')) {
    setIfString(map, 'cta_badge', content.badge)
    setIfString(map, 'cta_title', content.title)
    setIfString(map, 'cta_subtitle', firstString(content.description, content.subtitle))
    setIfString(map, 'cta_whatsapp', content.whatsapp)
    setIfString(map, 'cta_feature1', content.feature_1)
    setIfString(map, 'cta_feature2', content.feature_2)
    setIfString(map, 'cta_feature3', content.feature_3)
  }
}

function mapSobreSection(map: Record<string, string>, section: CmsSection) {
  const content = section.content ?? {}
  copyLegacyShapedContent(map, content)

  if (isSectionMatch(section, 'hero')) {
    setIfString(map, 'about_hero_badge', content.badge)
    setIfString(map, 'about_hero_title', content.title)
    setIfString(map, 'about_hero_subtitle', content.subtitle)
  }

  if (isSectionMatch(section, 'story')) {
    setIfString(map, 'about_story_badge', content.badge)
    setIfString(map, 'about_story_title', content.title)
    const longContent = firstString(content.content)
    const paragraphs = typeof longContent === 'string' ? longContent.split(/\n\n+/).filter(Boolean) : []

    if (paragraphs.length > 0) {
      setIfString(map, 'about_story_p1', paragraphs[0])
      setIfString(map, 'about_story_p2', paragraphs[1])
      setIfString(map, 'about_story_p3', paragraphs[2])
    } else {
      setIfString(map, 'about_story_p1', content.paragraph_1)
      setIfString(map, 'about_story_p2', content.paragraph_2)
      setIfString(map, 'about_story_p3', content.paragraph_3)
    }

    setIfString(map, 'about_story_bullet1', content.bullet_1)
    setIfString(map, 'about_story_bullet2', content.bullet_2)
    setIfString(map, 'about_story_bullet3', content.bullet_3)
    setIfString(map, 'about_story_bullet4', content.bullet_4)
    setIfString(map, 'about_story_years', firstString(content.years_value, content.about_story_years, content.years))
    setIfString(map, 'about_story_years_label', firstString(content.years_label, content.about_story_years_label))
    setIfString(map, 'about_story_sold', firstString(content.sold_value, content.about_story_sold, content.sold))
    setIfString(map, 'about_story_sold_label', firstString(content.sold_label, content.about_story_sold_label))
    setIfString(map, 'about_story_image', firstString(content.image, content.image_url))
  }

  if (isSectionMatch(section, 'values')) {
    setIfString(map, 'about_values_badge', content.badge)
    setIfString(map, 'about_values_title', content.title)
    const items = Array.isArray(content.items) ? content.items : []
    const first = items[0] as Record<string, unknown> | undefined
    const second = items[1] as Record<string, unknown> | undefined
    const third = items[2] as Record<string, unknown> | undefined
    setIfString(map, 'about_card1_title', firstString(first?.title, content.card_1_title))
    setIfString(map, 'about_card1_desc', firstString(first?.description, content.card_1_desc))
    setIfString(map, 'about_card2_title', firstString(second?.title, content.card_2_title))
    setIfString(map, 'about_card2_desc', firstString(second?.description, content.card_2_desc))
    setIfString(map, 'about_card3_title', firstString(third?.title, content.card_3_title))
    setIfString(map, 'about_card3_desc', firstString(third?.description, content.card_3_desc))
  }

  if (isSectionMatch(section, 'team')) {
    setIfString(map, 'about_team_badge', content.badge)
    setIfString(map, 'about_team_title', content.title)
    setIfString(map, 'about_team_subtitle', content.subtitle)
    const members = Array.isArray(content.members)
      ? content.members
      : Array.isArray(content.team_members)
        ? content.team_members
        : Array.isArray(content.members_list)
          ? content.members_list
          : []
    const hasStructuredMembers = members.some((member) => {
      if (!member || typeof member !== 'object') return false
      const row = member as Record<string, unknown>
      return [row.name, row.role, row.creci, row.image].some((value) => typeof value === 'string' && value.trim().length > 0)
    })
    const m1 = members[0] as Record<string, unknown> | undefined
    const m2 = members[1] as Record<string, unknown> | undefined
    const m3 = members[2] as Record<string, unknown> | undefined
    if (hasStructuredMembers) {
      setIfString(map, 'about_team1_name', firstString(m1?.name, content.member_1_name))
      setIfString(map, 'about_team1_role', firstString(m1?.role, content.member_1_role))
      setIfString(map, 'about_team1_creci', firstString(m1?.creci, content.member_1_creci))
      setIfString(map, 'about_team1_image', firstString(m1?.image, content.member_1_image))
      setIfString(map, 'about_team2_name', firstString(m2?.name, content.member_2_name))
      setIfString(map, 'about_team2_role', firstString(m2?.role, content.member_2_role))
      setIfString(map, 'about_team2_creci', firstString(m2?.creci, content.member_2_creci))
      setIfString(map, 'about_team2_image', firstString(m2?.image, content.member_2_image))
      setIfString(map, 'about_team3_name', firstString(m3?.name, content.member_3_name))
      setIfString(map, 'about_team3_role', firstString(m3?.role, content.member_3_role))
      setIfString(map, 'about_team3_creci', firstString(m3?.creci, content.member_3_creci))
      setIfString(map, 'about_team3_image', firstString(m3?.image, content.member_3_image))
    } else {
      setIfString(map, 'about_team1_name', content.member_1_name)
      setIfString(map, 'about_team1_role', content.member_1_role)
      setIfString(map, 'about_team1_creci', content.member_1_creci)
      setIfString(map, 'about_team1_image', content.member_1_image)
      setIfString(map, 'about_team2_name', content.member_2_name)
      setIfString(map, 'about_team2_role', content.member_2_role)
      setIfString(map, 'about_team2_creci', content.member_2_creci)
      setIfString(map, 'about_team2_image', content.member_2_image)
      setIfString(map, 'about_team3_name', content.member_3_name)
      setIfString(map, 'about_team3_role', content.member_3_role)
      setIfString(map, 'about_team3_creci', content.member_3_creci)
      setIfString(map, 'about_team3_image', content.member_3_image)
    }
  }

  if (isSectionMatch(section, 'cta')) {
    setIfString(map, 'about_cta_title', content.title)
    setIfString(map, 'about_cta_subtitle', firstString(content.description, content.subtitle))
    setIfString(map, 'about_cta_btn', firstString(content.buttonText, content.button_text))
  }
}

function mapContatoSection(map: Record<string, string>, section: CmsSection) {
  const content = section.content ?? {}
  copyLegacyShapedContent(map, content)

  if (isSectionMatch(section, 'hero')) {
    setIfString(map, 'contact_hero_badge', content.badge)
    setIfString(map, 'contact_hero_title', content.title)
    setIfString(map, 'contact_hero_subtitle', content.subtitle)
  }

  if (isSectionMatch(section, 'contact_info')) {
    setIfString(map, 'contact_phone', firstString(content.phone, content.phone_number, content.telefone))
    setIfString(map, 'contact_email', firstString(content.email, content.mail, content.email_address))
    setIfString(map, 'contact_address', firstString(content.address, content.endereco))
    setIfString(map, 'contact_hours', firstString(content.hours, content.business_hours, content.horario))
    setIfString(map, 'contact_whatsapp', firstString(content.whatsapp, content.whatsapp_number))
    setIfString(map, 'contact_map_url', firstString(content.map_url, content.mapUrl, content.mapa_url))
  }
}

export function mapSectionsToLegacyContent(pageSlug: string, sections: CmsSection[]) {
  const map: Record<string, string> = {}

  sections.forEach((section) => {
    if (pageSlug === 'home') {
      mapHomeSection(map, section)
      return
    }

    if (pageSlug === 'sobre') {
      mapSobreSection(map, section)
      return
    }

    if (pageSlug === 'contato') {
      mapContatoSection(map, section)
    }
  })

  return map
}
