<template>
  <div id="app">
    <header class="header">
      <b-navbar toggleable="lg" type="dark" variant="dark" id="nav">
        <b-navbar-brand :to="{ name: 'Accueil' }">
           <img src="./img/logo.jpg" width="30" height="30" alt="logo">
        </b-navbar-brand>
        <b-navbar-brand :to="{ name: 'Accueil' }">Mon site</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <b-navbar-nav>
            <b-nav-item :to="{ name: 'Accueil' }" active-class="active">Accueil</b-nav-item>
            <b-nav-item :to="{ name: 'Formulaire' }" active-class="active">Formulaire</b-nav-item>
            <b-nav-item :to="{ name: 'Tableaux' }" active-class="active">Tableaux</b-nav-item>
            <b-nav-item :to="{ name: 'Contact' }" active-class="active">Contact</b-nav-item>
            <b-nav-item href="#" disabled>Lien inactif</b-nav-item>

            
            <b-nav-item-dropdown text="Choix du thème" right>
              <b-dropdown-item href="#">Thème 1</b-dropdown-item>
              <b-dropdown-item href="#">Thème 2</b-dropdown-item>
              <b-dropdown-item href="#">Thème 3</b-dropdown-item>
              <b-dropdown-item href="#">Thème 4</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="md" class="mr-sm-2" placeholder="Recherche" ></b-form-input>
              <b-button size="md" class="my-2 my-sm-0" variant="primary" type="submit">Rechercher</b-button>
            </b-nav-form>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    
    <main class="container">
      <router-view/>
    </main>
   
    <footer class="footer mt-auto py-3 fixed-bottom">
      <span class="text-muted ml-3">&copy; Ceci est un footer</span>
    </footer>

  </div>
</template>

<style lang="scss">

main.container {
  margin-top: 5px;
  margin-bottom: 4rem;
}
.footer {
  background-color: #ededed;
}

</style>

<script>


export default {

}
</script>
