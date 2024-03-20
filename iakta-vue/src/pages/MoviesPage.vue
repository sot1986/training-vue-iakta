<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'MoviesPage',
  inheritAttrs: false,
})

const movies = ref([
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
])

const newMovie = ref({ title: '', year: 0 })

function addMovie() {
  movies.value.push({ title: newMovie.value.title, year: newMovie.value.year })

  newMovie.value = { title: '', year: 0 }
}

function removeMovie(title: string) {
  movies.value = movies.value.filter(movie => movie.title !== title)
}
</script>

<template>
  <div>
    <h1>
      Movies
    </h1>
    <ul class="flex flex-col gap-4">
      <transition-group
        enter-from-class="opacity-0 scale-0"

        enter-active-class="transition ease-out duration-300"
        leave-active-class="transition ease-in duration-100"
        leave-to-class="opacity-0 scale-0"
      >
        <li v-for="movie in movies" :key="`movie-${movie.title}`" class="flex justify-between gap-2">
          <p class="text-blue-500 font-semibold">
            {{ movie.title }}
          </p>
          <div>year: {{ movie.year }}</div>
          <button type="button" class="text-red-500 font-semibold text-xl" @click="removeMovie(movie.title)">
            X
          </button>
        </li>
      </transition-group>
    </ul>

    <form class="flex flex-col gap-4" @submit.prevent="addMovie">
      <fieldset>
        <label for="title">
          Titolo
        </label>
        <input v-model="newMovie.title" type="text" name="title">
      </fieldset>
      <fieldset>
        <label for="year">Year</label>
        <input v-model="newMovie.year" type="number" name="year">
      </fieldset>

      <div class="flex justify-end">
        <button class="bg-indigo-500 text-white px-4 py-2 font-semibold">
          Add
        </button>
      </div>
    </form>
  </div>
</template>
