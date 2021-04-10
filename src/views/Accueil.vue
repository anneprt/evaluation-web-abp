<template>  
    
    <b-jumbotron>
        <template v-slot:header>Bonjour !</template>
        
        <template v-slot:lead>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur libero itaque nam animi molestiae rem quaerat quidem, accusantium optio nostrum ratione ab. Consequatur nobis aliquam excepturi facere! Reiciendis, cum in!.
        </template>
        
        <hr>
        
        <p>
            Ceci est un paragraphe
        </p>

        <div class="text-center">
            <b-button :to="{ name: 'Formulaire' }" variant="primary" class="mr-1" size="lg">Formulaire</b-button>
            <b-button :to="{ name: 'Tableaux' }" variant="primary"  class="mr-1" size="lg">Tableaux</b-button>
            <b-button :to="{ name: 'Contact' }" variant="primary"  class="mr-1" size="lg">Contact</b-button>
        </div>
            
    </b-jumbotron>
    
</template>