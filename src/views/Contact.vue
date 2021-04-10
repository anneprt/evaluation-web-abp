<template>
    
    <b-form  @submit.prevent="onSubmit">
        <b-form-group id="groupeZoneMessage"
            label="Un message à transmettre?"
            label-for="zoneMessage">
            <b-form-textarea v-model="form.zoneMessage" id="zoneMessage" rows="10" placeholder="Ecrivez ici"></b-form-textarea>
        </b-form-group>
        <b-form-group id="zoneFichier" >
            <b-form-file
                id="pieceJointe"
                v-model="form.pieceJointe"
                :state="Boolean(form.pieceJointe)"
                placeholder="Choisissez un fichier ou le faire glisser ICI..."
                drop-placeholder="Faire glisser le fichier ici..."
                browse-text="Choisir un fichier"
            ></b-form-file>
        </b-form-group>
        <p>
            Votre message apparaître sous la forme:
        </p>
        <p>
            {{ form.zoneMessage }}
        </p>
        <b-button type="submit" variant="success">Envoyer</b-button>
    </b-form>

</template>

<script>
  export default {
    data() {
      return {
        form: {
            zoneMessage: '',
            pieceJointe: null
        },
        infoModal: {
          id: 'infoModal',
          content: ''
        }  
      }
    },
    methods: {
      onSubmit() {
        this.$bvModal.msgBoxOk('Message envoyé: ' + this.form.zoneMessage)
      }
    }
  }
</script>
