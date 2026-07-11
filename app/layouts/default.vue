<template>
  <div class="flex min-h-screen flex-col">
    <SiteHeader />
    <main class="flex-1">
      <div class="mx-auto w-full max-w-[74rem] px-6 md:px-10">
        <slot />
      </div>
    </main>
    <SiteFooter />
  </div>
</template>
