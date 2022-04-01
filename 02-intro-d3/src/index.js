import * as d3 from 'd3';

const WIDTH = 400
const HEIGHT =350

const svg = d3.select("body")
    .append("svg") //Les éléments dessinés doivent être dans un canva sinon ils ne se voient pas
    .attr("width", WIDTH)
    .attr("height", HEIGHT)


const groupe1 = svg.append("g")
const groupe2 = svg.append("g")
const groupe3 = svg.append("g")
const groupe4 = svg.append("g")


//// Groupe - 1
groupe1.append("circle")
    .attr("cx", "50")
    .attr("cy", "50")
    .attr("r", "40")
    .attr("transform", "translate (50,0)") //à la base les cercles étaients alignés

groupe1.append("text")
    .text("Marilyn")
    .attr("x", "65")
    .attr("y", "110")


////Groupe - 2
groupe2.append("circle")
    .attr("cx", "150")
    .attr("cy", "150")
    .attr("r", "40")
    .attr("transform", "translate (50,0)")

groupe2.append("text")
    .text("Marilyn")
    .attr("x", "165")
    .attr("y", "210")


///Groupe - 3
groupe3.append("circle")
    .attr("cx", "250")
    .attr("cy", "250")
    .attr("r", "40")
    .attr("transform", "translate (50,0)")

groupe3.append("text")
    .text("Marilyn")
    .attr("x", "265")
    .attr("y", "310")

//Alignement si click

groupe3.on("click", () => {
    groupe1.attr("transform", "translate (200,0)") //On doit faire translate si on veut bouger tout le groupe (qui a déjà été translaté)
    groupe2.attr("transform", "translate (100,0)")
    console.log("coucou");
})


/// 


const data = [20, 5, 25, 8, 15]

groupe4.selectAll("rect") //Même si ils n'existent pas encore, je vais les créer après
    .data(data)
    .enter() //Pour faire entrer les données dans la fonction
    .append("rect")
    
        //Définir la position xy de chaque colonne
        .attr('x', (d, i) => i * 30) //Pour chaque index, la valeur du x = 0*30...1*30...
                //Ne pas oublier que l'origine est en haut à gauche et que le positif tend vers le bas. 
        //Donc pour faker que c'est à l'endroit notre y doit commencer un peu plus bas soit : height - d value 
        .attr('y', d => HEIGHT - d) //Comme la longueur du graph + height = ça arrivera toujours au même point.

        //Définir la largeur et la hauteur pour qu'il y ait apparition de colonnes

    .attr('height', d => d) //Hauteur de la colonne relative aux cases du tableau
    .attr('width', "20") //Largeur de la colonne



    //Utiliser les groupes 
    //Utiliser les attributs 
    //On peut faire bouger les choses au clic avec le transform











