<template>
  <v-container grid-list-lg>
    <v-layout v-if="builds" wrap>
      <v-flex 
        v-for="(build,index) in builds" 
        :key="build._id" 
        xs12 
      >
        <Install 
          :build="build" 
          :small="true"
          class="install-button" 
        />
        <div class="title">{{ build.versionName }} <span class="body-1">({{ build.version }})</span></div>
        <p class="caption">{{ build.created|date }}</p>
        <p v-html="build.notes"/>
        <v-divider v-if="index<builds.length-1"/>
      </v-flex>
    </v-layout>

    <Loading 
      v-else 
      :error="error" 
      placeholders="viewHistory"
    />
  </v-container>
</template>


<script>
import { mapActions, mapState } from 'vuex'
import Loading from '@/components/ui/Loading'
import Install from '@/components/ui/Install'

export default {
  components: { Loading, Install },
  props: {
    app: { type: Object, required: true },
  },
  data: () => ({
    builds: null,
    error: null,
  }),
  computed: {
    ...mapState('main', ['so']),
  },
  async created() {
    try {
      const allBuilds = await this.getBuilds(this.app._id)
      this.builds = allBuilds.filter(build => build.so === this.so)
    } catch (err) {
      this.error = err
    }
  },
  methods: {
    ...mapActions({
      getBuilds: 'fetch/GET_BUILDS',
    }),
  },
}
</script>

<style scoped>
.install-button {
  float: right;
}
</style>
