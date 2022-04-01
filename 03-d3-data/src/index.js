import * as d3 from 'd3';
import { json } from 'd3-fetch' // Pour dire qu'on utilise d3

//Si un seul dataset
// d3.json('url/ou/chemin/du/fichier.json')
//     .then(function (data) {
//         // Dessiner ici!
//     })
//     .catch(function (error) {
//         // Gérer l'erreur ici!
//     })



Promise.all([ //Pour importer plusieurs datasets
    json('https://jsonplaceholder.typicode.com/posts'),
    json('https://jsonplaceholder.typicode.com/users')
])
    .then(([posts, users]) => {

        // * A partir des données **users** et **posts**, créez un tableau d'objets qui a la structure suivante
        // [
        //     {
        //       nom_utilisateur: 'Machin',
        //       ville: 'Truc',
        //       nom_companie: 'Bidule',
        //       titres_posts: [
        //         'Titre 1',
        //         'Titre 2',
        //       ]
        //     },
        //     // ...
        //   ]

        //Le tout dans un seul tableau en console log

        const tableau = users.map((d, i) => { //accumulateur, currentvalue. Chaque case du tableau correspondant à une personne,

            const post_Filtered = posts.filter(p => p.userId == d.id)//...  contiennent les valeurs filtrées des posts : Forcément 10 car 10 users, les posts triés par users

            const values = {
                "id" : d.id,
                "nom_dutilisateur" : d.username,
                "Ville" : d.address.city,
                "Nom_compagnie" : d.company.name,
                "Titres_posts" : [...post_Filtered]

            }
            return values
            //À la place de faire l'objet dans le return
            //return { ["id"]: [d.id], ["nom d'utilisateur"]: [d.username], ["Ville"]: [d.address.city], ["Nom compagnie"]: [d.company.name], ["Titres posts"]: [...post_Filtered] }

        });

        console.log(tableau);

        //Variable pour le nombre de post par users
        // const nbusers = d3.count(users);
        // const nbposts = d3.count(posts);
     
        //Solution 2
        users.forEach(user => {
            let compteurParUser = 0;

            posts.forEach(post => {
                // console.log(post.userId);
                if (post.userId == user.id) {
                    compteurParUser++;
                }
            })

            const svg = d3.select("body")
                .append("svg")
                .attr("width", 400)
                .attr("height", 150)
                .append("text")
                .text(`${user.name} a écrit ${compteurParUser} article(s).`)
                .attr("x", "65")
                .attr("y", "110")
        })

        // * Trouvez le **user** qui a écrit le texte le plus long dans **posts.body** // Utile si on veut mettre en évidence les extrêmes dans les données
        let postLePlusLong = 'abc';
        let postLePlusLongUserId = 0;


        posts.forEach(post => {
            // console.log(post.body.length);
            if (postLePlusLong.length < post.body.length) {
                postLePlusLong = post.body;
                postLePlusLongUserId = post.userId
            }
        })
        let userPostLePlusLong = users[postLePlusLongUserId-1].name;

        d3.select("body")
            .append("div")
            .attr('id', 'postLePlusLong')
        d3.select('#postLePlusLong')
            .append('p')
            .text(`${userPostLePlusLong} a écrit le plus long post. Ce dernier disait "${postLePlusLong}". :-)`)


        // * Dessinez un graphique en bâton en ayant sur l'axe *x* les utilisateurs et *y* le nombre de posts


        let margin = { top: 20, right: 10, bottom: 60, left: 60 };
        let width = 1000 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        d3.select("body")
            .append("div")
            .attr('id', 'graph')

        let svg = d3.select("#graph")
            .append("svg")
            .attr("width", width + margin.left + margin.right )
            .attr("height", height + margin.top + margin.bottom)
            .append("g") 
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


            //Définition des échelles 
        let x = d3.scaleBand() //echelle//Pour avoir le nom en dessous de la band (colonne) pour les données ordinales
            .domain(tableau.map(d => d.nom_dutilisateur ))
            .range([0, width]); //Pour avoir les différents traits

        let y = d3.scaleLinear() //echelle
            .domain([0, 10]) //Pour avoir les différents traits
            .range([height, 0]); //Inverser l'ordre pour les données quantitatives //range doit être contenu dans le canva
            console.log(y(0));

        let gfg = x.bandwidth()
        console.log(gfg)

             //Création des axes    
        svg.append("g") //Pour créer les axes il faut appeler les échelles correspondantes
            .call(d3.axisLeft(y));

        svg.append("g") //Pour créer les axes il faut appeler les échelles correspondantes
            .attr("transform", "translate(0," + height + ")") //Sinon l'axe est en haut...
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-2,10)") //Pour décaler les textes un peu plus bas
            console.log(tableau.map(d=>y(d.Titres_posts.length)))
           
            svg.selectAll("bars")
            .data(tableau)
            .enter()
            .append("rect") //pour que ce soit des lignes
            .attr('x', (d,i) => x(d.nom_dutilisateur) + 25) //Pour chaque élément d correspondant aux nombrs d'users, avoir une distance de i*30
            .attr('y', d => y(d.Titres_posts.length)) //Pourquoi on ne commence pas à zéro vu que l'on a inversé ?
            .attr("height", d => y(0) - y(d.Titres_posts.length)) //ça je suis d'accord
            .attr("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)
            .attr("width", x.bandwidth()/2)

          
    })


