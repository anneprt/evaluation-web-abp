<template>
  <ValidationObserver ref="form">
    <b-form @submit.prevent="onSubmit">
      <ValidationProvider
          name="titre"
          rules="required"
          v-slot="{ errors, valid }"
          slim
      >
        <b-form-group label="Titre:" label-cols="1" :state="valid">
          <b-form-radio-group
              class="pt-2"
              label="Titre:"
              id="civilite"
              v-model="form.titre"
              :options="civiliteOptions"
              name="civilite"
              required
              :state="valid"
              :invalid-feedback="errors[0]"
          ></b-form-radio-group>
        </b-form-group>
      </ValidationProvider>
      <b-form-row>
        <ValidationProvider
            name="nom"
            rules="required"
            v-slot="{ errors, valid }"
            slim
        >
          <b-form-group
              id="groupeNom"
              label="Nom:"
              label-for="nom"
              class="col-md-6"
              :state="valid"
              :invalid-feedback="errors[0]"
          >
            <b-form-input
                id="nom"
                v-model="form.nom"
                type="text"
                required
                :state="valid"
            ></b-form-input>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
            name="prenom"
            rules="required"
            v-slot="{ errors, valid }"
            slim
        >
          <b-form-group
              id="groupePrenom"
              label="Prénom:"
              label-for="prenom"
              class="col-md-6"
              :state="valid"
              :invalid-feedback="errors[0]"
          >
            <b-form-input
                id="prenom"
                v-model="form.prenom"
                type="text"
                required
                :state="valid"
            ></b-form-input>
          </b-form-group>
        </ValidationProvider>
      </b-form-row>
      <b-form-row>
        <ValidationProvider
            name="email"
            rules="required|email"
            v-slot="{ errors, valid }"
            slim
        >
          <b-form-group
              id="groupeEmail"
              label="E-Mail:"
              label-for="email"
              class="col-md-6"
              :state="valid"
              :invalid-feedback="errors[0]"
          >
            <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                required
                :state="valid"
            ></b-form-input>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider
            name="motpasse"
            rules="required"
            v-slot="{ errors, valid }"
            slim
        >
          <b-form-group
              id="groupeMotpasse"
              label="Mot de passe:"
              label-for="motpasse"
              class="col-md-6"
              :state="valid"
              :invalid-feedback="errors[0]"
          >
            <b-form-input
                id="motpasse"
                v-model="form.motDePasse"
                type="password"
                required
                :state="valid"
            ></b-form-input>
          </b-form-group>
        </ValidationProvider>
      </b-form-row>

      <b-form-row>
        <ValidationProvider
            name="adresse1"
            rules="required"
            v-slot="{ errors, valid }"
            slim
        >
          <b-form-group
              id="groupeAdresse"
              label="Adresse:"
              label-for="adresse"
              class="col"
              :state="valid"
              :invalid-feedback="errors[0]"
          >
            <b-form-input
                id="adresse"
                v-model="form.adresse1"
                type="text"
                placeholder="123 rue Lulu"
                required
                :state="valid"
            ></b-form-input>
          </b-form-group>
        </ValidationProvider>
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
        <ValidationProvider
            name="ville"
            rules="required"
            v-slot="{ errors, valid }"
            slim
        >
          <b-form-group
              id="groupeVille"
              label="Ville:"
              label-for="ville"
              class="col-md-6"
              :state="valid"
              :invalid-feedback="errors[0]"
          >
            <b-form-input
                id="ville"
                v-model="form.ville"
                type="text"
                required
                :state="valid"
            ></b-form-input>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
            name="codepostal"
            rules="required"
            v-slot="{ errors, valid }"
            slim
        >
          <b-form-group
              id="groupeCodepostal"
              label="Code postal:"
              label-for="codepostal"
              class="col-md-6"
              :state="valid"
              :invalid-feedback="errors[0]"
          >
            <b-form-input
                id="codepostal"
                v-model="form.codePostal"
                type="text"
                required
                :state="valid"
            ></b-form-input>
          </b-form-group>
        </ValidationProvider>
      </b-form-row>

        <b-form-checkbox
            id="cochez"
            v-model="form.cguAcceptees"
            name="cochez"
        >
          J'ai lu et accepté les CGU
        </b-form-checkbox>

      <b-button type="submit" variant="success" @click.prevent="onSubmit"
      >Envoyer
      </b-button
      >
    </b-form>
  </ValidationObserver>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        "titre",
        "nom",
        "prenom",
        "adresse1",
        "adresse2",
        "codePostal",
        "ville",
        "cguAcceptees",
      ],
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
        {text: "M.", value: "Monsieur"},
        {text: "Mme", value: "Madame"},
        {text: "Ne souhaite pas répondre", value: "NR"},
      ],
    };
  },
  created() {
    this.resetForm();
  },
  methods: {
    resetForm() {
      this.form = {
        titre: "Monsieur",
      };
    },
    onSubmit() {
      this.$refs.form.validate().then((success) => {
        if (success)  {
          this.axios
              .post("/api/personnes", this.form)
              .then((res) => {
                this.$bvToast.toast("Enregistrement envoyé avec succès", {
                  variant: "success",
                  solid: true,
                });

                //reset formulaire
                this.resetForm();

                //rafraichissement
                this.$refs.form.reset();
              })
              .catch((err) => {
                console.log(err.response)
                if(err.response.data.errors!=null){
                for (let i = 0; i < err.response.data.errors.length; i++) {
                  this.$bvToast.toast(
                      err.response.data.errors[i].defaultMessage,
                      {variant: "danger", solid: true}
                  );
                }}

              });
        }
      });
    },
  },
};
</script>
