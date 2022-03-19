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

            return { ["id"]: [d.id], ["nom d'utilisateur"]: [d.username], ["Ville"]: [d.address.city], ["Nom compagnie"]: [d.company.name], ["Titres posts"]: [...post_Filtered] }

        });



        //Variable pour le nombre de post par users
        const nbusers = d3.count(users);
        const nbposts = d3.count(posts);

        console.log(users);
        console.log(nbusers);
        console.log(nbposts);


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
                .attr("height", 400)
                .append("text")
                .text(`${user.name} a écrit ${compteurParUser} article(s).`)
                .attr("x", "65")
                .attr("y", "110")


        })


        // * Trouvez le **user** qui a écrit le texte le plus long dans **posts.body**
        let postLePlusLong = 'abc';
        let postLePlusLongUserId = 0;


        posts.forEach(post => {
            // console.log(post.body.length);
            if (postLePlusLong.length < post.body.length) {
                postLePlusLong = post.body;
                postLePlusLongUserId = post.userId
            }
        })


        console.log(postLePlusLong);
        console.log(postLePlusLongUserId);
        let userPostLePlusLong = users[postLePlusLongUserId - 1].name;

        d3.select("body")
            .append("div")
            .attr('id', 'postLePlusLong')
        d3.select('#postLePlusLong')
            .append('p')
            .text(`${userPostLePlusLong} a écrit le plus long post. Ce dernier disait "${postLePlusLong}". :-)`)


        // * Dessinez un graphique en bâton en ayant sur l'axe *x* les utilisateurs et *y* le nombre de posts

        let margin = { top: 20, right: 10, bottom: 60, left: 60 };
        let width = 1500 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        d3.select("body")
            .append("div")
            .attr('id', 'graph')

        let svg = d3.select("#graph")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        let x = d3.scaleBand()
            .domain(tableau.map(function (d) { return d["nom_utilisateur"]; }))
            .range([1000, 0]);

        let y = d3.scaleLinear()
            .domain([0, 10])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-2,10)")

        svg.selectAll("bars")
            .data(tableaus)
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d["nom_utilisateur"]) + 30; })
            .attr("y", function (d) { return y(d["posts"].length); })
            .attr("width", "40px")
            .attr("height", function (d) { return height - y(d["posts"].length); })
            .attr("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)


    })


