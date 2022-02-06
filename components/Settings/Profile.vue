<template>
    <div id="Capsule">

        <div class="section mt-3 text-center">
            <div class="avatar-section">
                <a href="#">
                    <img src="~/assets/img/fluense.png" alt="avatar" class="imaged w100 rounded">
                    <label class="form-check-label" for="gridRadios3">
                        {{account}}
                    </label>
                </a>
            </div>
        </div>
        
        <div class="listview-title mt-1">Wallet Settings</div>
        <ul class="listview image-listview text inset">
            <li>
                <div class="form-group basic">
                    <label for="formGroupExampleInput">Private Key</label>
                    <label v-if="message" for="formGroupExampleInput" class = "text-danger">{{message}}</label>
                    <div class="input-group mb-2">
                        <input v-model="key" type="text" class="form-control" id="formGroupExampleInput" placeholder="input your private key">
                        <div tupe="button" type="submit" class="btn btn-primary" @click="pageGenerateAddress(key)">Generate</div>
                    </div>
                </div>
            </li>
            
            <li>
                <div class="form-group basic">
                    <label for="formGroupExampleInput">Your Address</label>
                    <input
                        type="text" 
                        class="form-control" 
                        placeholder="Your Address"
                        disabled 
                    >
                </div>
            </li>
        </ul>
    </div>
</template> 


<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name: 'Profile',
    components: {

    },
    props: {
        
    },
    data () {
        return {
            key:null,
            message:null,
        }
    },
    computed: {
        ...mapState('page', ['popup', 'account', 'address', 'symbol']),
    },
    methods: {
        ...mapActions('page', ['generateAddress']),

        pageGenerateAddress(key){
            this.message = null;
            if (key)
                if (key.length<64){
                    this.message = 'Invalid key. must be x64'
                }else{
                    this.generateAddress(key)
                }
            else
                this.generateAddress(key)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>