<script setup lang="ts">
import Container from '@/components/atoms/Container/Container.vue'
import Card from '@/components/molecules/Card/Card.vue'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'

const testimonials = [
  { name: 'Rina & Andi', location: 'Jakarta', quote: 'Undangan digital dari Abadikan bikin tamu kami kagum. Desainnya elegan dan sangat mudah digunakan. Highly recommended!', avatar: '' },
  { name: 'Sari & Budi', location: 'Bandung', quote: 'Fitur RSVP-nya sangat membantu kami mengatur jumlah tamu. Semua berjalan lancar tanpa ribet. Terima kasih Abadikan!', avatar: '' },
  { name: 'Maya & Dimas', location: 'Surabaya', quote: 'Filter Instagram custom dari Abadikan jadi highlight di acara kami. Semua tamu suka dan langsung share ke sosmed mereka.', avatar: '' },
]
</script>

<template>
  <section class="py-20 bg-[var(--color-bg-subtle)]">
    <Container size="xl">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-[var(--color-text-heading)] tracking-tight mb-4" style="font-family: var(--font-display)">
          Dipercaya Pasangan Indonesia
        </h2>
        <p class="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Cerita bahagia dari mereka yang sudah menggunakan Abadikan.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          v-for="t in testimonials"
          :key="t.name"
          variant="default"
          padding="lg"
          radius="xl"
        >
          <div class="flex flex-col gap-4">
            <p class="text-sm text-[var(--color-text-primary)] leading-relaxed italic">"{{ t.quote }}"</p>
            <div class="flex items-center gap-3 mt-2">
              <Avatar :name="t.name" size="md" />
              <div>
                <div class="text-sm font-semibold text-[var(--color-text-heading)]">{{ t.name }}</div>
                <div class="text-xs text-[var(--color-text-tertiary)]">{{ t.location }}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  </section>
</template>
