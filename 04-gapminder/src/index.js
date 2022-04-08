import * as d3 from 'd3';

//1-importer mes données
import revenuParPersonne from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
import lifeExpectancy from '../data/life_expectancy_years.csv'
import population from '../data/population_total.csv'


//2-Traiter mes données dans un tableau qui m'est plus pratique 

let popTransformed = population.map(d => {
    // Trouver le format SI (M, B, k)
    let SI = typeof d["2021"] === 'string' || d["2021"] instanceof String ? d["2021"].slice(-1) : d["2021"];

    // Extraire la partie numérique
    let number = typeof d["2021"] === 'string' || d["2021"] instanceof String ? parseFloat(d["2021"].slice(0, -1)) : d["2021"];

    // Selon la valeur SI, multiplier par la puissance
    switch (SI) {
        case 'M': {
            return Math.pow(10, 6) * number;
            break;
        }
        case 'B': {
            return Math.pow(10, 9) * number;
            break;
        }
        case 'k': {
            return Math.pow(10, 3) * number;
            break;
        }
        default: {
            return number;
            break;
        }
    }
})


let revTransformed = revenuParPersonne.map(d => {
    // Trouver le format SI (M, B, k)
    let SI = typeof d["2021"] === 'string' || d["2021"] instanceof String ? d["2021"].slice(-1) : d["2021"];

    // Extraire la partie numérique
    let number = typeof d["2021"] === 'string' || d["2021"] instanceof String ? parseFloat(d["2021"].slice(0, -1)) : d["2021"];

    // Selon la valeur SI, multiplier par la puissance
    switch (SI) {
        case 'M': {
            return Math.pow(10, 6) * number;
            break;
        }
        case 'B': {
            return Math.pow(10, 9) * number;
            break;
        }
        case 'k': {
            return Math.pow(10, 3) * number;
            break;
        }
        default: {
            return number;
            break;
        }
    }
})


const tableaulifeexpectancy2021 = lifeExpectancy.map((d, i) => {
    return d["2021"]
})


const tableaucountry = revenuParPersonne.map((d, i) => {
    return d.country
})



const tableau = revenuParPersonne.map((d, i) => {

    const values = {
        "Année": "2021",
        "Pays": tableaucountry[i],
        "Revenu": revTransformed[i],
        "Lifexpectancy": tableaulifeexpectancy2021[i],
        "Population": popTransformed[i]
    }

    return values
})


// console.log(tableau);




//3-Créer les échelles 

let margin = { top: 20, right: 10, bottom: 60, left: 60 };
let width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


const rangeX = [0, 500, 1000, 2000, 4000, 8000, "16k", "32k", "64k", "128k"]

let x = d3.scaleLinear()
    .domain([0, 128000])
    .range([0, width]);

let y = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

let z = d3.scaleLinear()
    .domain([0, 1310000000])
    .range([1, 40]);








//4-Créer les SVG

d3.select("body")
    .append("div")
    .attr('id', 'graph')

let svg = d3.select("#graph")

    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


svg.append('text')
    .text("2021")
    .attr("x", "250")
    .attr("y", "300")
    .style("font-size", "200")
    .style("text-decoration", "bold")
    .style("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)




//5-Création des axes    
svg.append("g") //Pour créer les axes il faut appeler les échelles correspondantes
    .call(d3.axisLeft(y));

svg.append("g") //Pour créer les axes il faut appeler les échelles correspondantes
    .attr("transform", "translate(0," + height + ")") //Sinon l'axe est en haut...
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-2,10)") //Pour décaler les textes un peu plus bas




//6-Suite du SVG
svg.selectAll("cercles")
    .data(tableau)
    .enter()
    .append("circle") //pour que ce soit des lignes
    .attr('cx', d => x(d.Revenu)) //Pour chaque élément d correspondant aux nombrs d'users, avoir une distance de i*30
    .attr('cy', d => y(d.Lifexpectancy)) //Pourquoi on ne commence pas à zéro vu que l'on a inversé ?
    .attr("r", d => z(d.Population)) //ça je suis d'accord
    .attr("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)
    .style("opacity", "0.7")
    .attr("stroke", "black")
    .style("stroke-width", "2px")










