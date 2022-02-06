<template>
    <div id="Capsule">

        <div class="section mt-3 text-center">
            <div class="avatar-section">
                <a href="#">
                    <img src="assets/img/fluense.png" alt="avatar" class="imaged w100 rounded">
                    <span class="button">
                        <i name="camera-outline" role="img" class="md hydrated" aria-label="camera outline"></i>
                    </span>
                    <label class="form-check-label" for="gridRadios3">
                        124112354711237741213171432
                    </label>
                </a>
            </div>
        </div>
        
        <div class="listview-title mt-1">Wallet Settings</div>
        <ul class="listview image-listview text inset">
            <li>
                <form>
                    <div class="form-group">
                        <label for="formGroupExampleInput">Your Address</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input">
                    </div>
                </form>
            </li>

             <li>
                <form>
                    <div class="form-group">
                        <label for="formGroupExampleInput">Private Key</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input">
                        <div class="col-sm-10">
                            <button type="submit" class="btn btn-primary">Generate</button>
                        </div>
                    </div>
                </form>
            </li>

             <li>
                <form>
                    <div class="form-group">
                        <label for="formGroupExampleInput">You Address</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input">
                    </div>
                </form>
            </li>
        </ul>
    </div>
</template> 


<script>export default {
  name: 'Stats',
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