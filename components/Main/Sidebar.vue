<template>
    <div class="Sidebar modal inset fade action-sheet ios-add-to-home" id="ios-add-to-home-screen" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add to Home Screen</h5>
                    <a href="#" class="close-button" data-bs-dismiss="modal">
                        <i name="close" role="img" class="md hydrated" aria-label="close"></i>
                    </a>
                </div>
                <div class="modal-body">
                    <div class="action-sheet-content text-center">
                        <div class="mb-1"><img src="assets/img/icon/192x192.png" alt="image" class="imaged w64 mb-2">
                        </div>
                        <div>
                            Install <strong>Wallet</strong> on your iPhone's home screen.
                        </div>
                        <div>
                            Tap <i name="share-outline" role="img" class="md hydrated" aria-label="share outline"></i> and Add to homescreen.
                        </div>
                        <div class="mt-2">
                            <button class="btn btn-primary btn-block" data-bs-dismiss="modal">CLOSE</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template> 


<script>export default {
  name: 'Sidebar',
  components: {
  },
  props: {
  },
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>