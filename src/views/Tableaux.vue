<template>
  <div>
    <b-table
      hover
      :items="personnes"
      :fields="fields"
      empty-text="Aucun élément"
      show-empty
    >
      <template #cell(actions)="{ item }">
        <b-btn @click="info(item)" class="mr-1" variant="primary">
          Informations
        </b-btn>
        <b-btn
          class="mr-2"
          variant="warning"
          @click="showModalModifierUtilisateur(item)"
          >Modifier</b-btn
        >
        <b-btn variant="danger" @click="supprimerUtilisateur(item)"
          >Supprimer</b-btn
        >
      </template>
    </b-table>
    <b-modal ref="modalEditUtilisateur" hide-footer>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Titre:" label-cols="1">
          <b-form-radio-group
            class="pt-2"
            label="Titre:"
            id="civilite"
            v-model="form.titre"
            :options="civiliteOptions"
            name="civilite"

          ></b-form-radio-group>
        </b-form-group>

        <b-form-row>
          <b-form-group
            id="groupeNom"
            label="Nom:"
            label-for="nom"
            class="col-md-6"
          >
            <b-form-input
              id="nom"
              v-model="form.nom"
              type="text"

            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="groupePrenom"
            label="Prénom:"
            label-for="prenom"
            class="col-md-6"
          >
            <b-form-input
              id="prenom"
              v-model="form.prenom"
              type="text"

            ></b-form-input>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group
            id="groupeEmail"
            label="E-Mail:"
            label-for="email"
            class="col-md-6"
          >
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"

            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="groupeMotpasse"
            label="Mot de passe:"
            label-for="motpasse"
            class="col-md-6"
          >
            <b-form-input
              id="motpasse"
              v-model="form.motDePasse"
              type="password"

            ></b-form-input>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group
            id="groupeAdresse"
            label="Adresse:"
            label-for="adresse"
            class="col"
          >
            <b-form-input
              id="adresse"
              v-model="form.adresse1"
              type="text"
              placeholder="123 rue Lulu"

            ></b-form-input>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group
            id="groupeAdressecomp"
            label="Adresse  (si nécessaire):"
            label-for="adressecomp"
            class="col"
          >
            <b-form-input
              id="adressecomp"
              v-model="form.adresse2"
              type="text"
              placeholder="Appartement, étage..."
            ></b-form-input>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group
            id="groupeVille"
            label="Ville:"
            label-for="ville"
            class="col-md-6"
          >
            <b-form-input
              id="ville"
              v-model="form.ville"
              type="text"

            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="groupeCodepostal"
            label="Code postal:"
            label-for="codepostal"
            class="col-md-6"
          >
            <b-form-input
              id="codepostal"
              v-model="form.codePostal"
              type="text"

            ></b-form-input>
          </b-form-group>
        </b-form-row>

        <b-form-checkbox id="cochez" v-model="form.cguAcceptees" name="cochez">
          J'ai lu et accepté les CGU
        </b-form-checkbox>
        <div class="text-right">
          <b-button class="mr-4" type="submit" variant="success"
            >Valider</b-button
          >
          <b-button
            class="mr-4"
            variant="info"
            type="button"
            @click="$refs.modalEditUtilisateur.hide()"
            >Annuler</b-button
          >
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  created() {
    this.initPage();
  },
  data() {
    return {
      personnes: [],
      fields: ["prenom", "nom", "email", "actions"],
      form: {
        titre: "",
        nom: "",
        prenom: "",
        email: "",
        motDePasse: "",
        adresse1: "",
        adresse2: "",
        ville: "",
        codePostal: "",
        cguAcceptees: false,
      },
      civiliteOptions: [
        { text: "M.", value: "Monsieur" },
        { text: "Mme", value: "Madame" },
        { text: "Ne souhaite pas répondre", value: "NR" },
      ],
    };
  },
  methods: {
    onSubmit() {
      if (this.form.id != null) {
        // Modification
        this.axios
          .put("/api/personnes/" + this.form.id, this.form)
          .then((res) => {
            this.$bvToast.toast("Formulaire envoyé avec succès !",{variant: "success", solid: true});
            this.initPage();
            this.$refs.modalEditUtilisateur.hide();
          })
          .catch((err) => {
            if(err.response.data.errors!=null){
              for (let i = 0; i < err.response.data.errors.length; i++) {
                this.$bvToast.toast(
                    err.response.data.errors[i].defaultMessage,
                    {variant: "danger", solid: true}
                );
              }}
          });
      }
    },
    initPage() {
      this.axios
        .get("/api/personnes")
        .then((res) => {
          console.log(res);
          this.personnes = res.data;
        })
        .catch((err) => console.error(err));
    },
    showModalAjoutUtilisateur() {
      this.form = {};
      this.$refs.modalEditUtilisateur.show();
    },

    showModalModifierUtilisateur(item) {
      this.form = { ...item };

      this.$refs.modalEditUtilisateur.show();
    },

    info(item) {
      this.axios
        .get("/api/personnes/" + item.id)
        .then((res) => {
          this.$bvModal.msgBoxOk(
            "Contact: " +
              item.prenom +
              " " +
              item.nom +
              " " +
              " Email: " +
              item.email
          );
        })
        .catch((err) => {
          this.$bvModal.msgBoxOk("utilisateur inconnu");
        });
    },

    supprimerUtilisateur(item) {
      this.$bvModal
        .msgBoxConfirm("Etes vous sûr de vouloir supprimer cet utilisateur ?", {
          size: "sm",
          buttonSize: "sm",
          centered: true,
          okVariant: "danger",
          okTitle: "OUI",
          cancelTitle: "NON",
        })
        .then((confirm) => {
          if (confirm) {
            this.axios
              .delete("/api/personnes/" + item.id)
              .then((res) => {
                this.initPage();
                this.$bvModal.msgBoxOk("Utilisateur supprimé avec succès");
              })
              .catch((err) => {
                this.$bvModal.msgBoxOk("Erreur lors de la suppression");
              });
          }
        });
    },
  },
};
</script>

<style>
.header_ligne {
  font-weight: bold;
}
</style>