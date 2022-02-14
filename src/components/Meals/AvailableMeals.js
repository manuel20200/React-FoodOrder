import React, { useEffect, useState } from 'react';

import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [httpError, setHttpError] = useState(null);
    
    useEffect(() => {
        //REQUEST
        const requestHandler = async() => {
            setIsLoading(true);
            const response = await fetch('https://react-httprequest-2a14f-default-rtdb.firebaseio.com/meals.json', {}); 
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
    
            const loadedMeals = [];

            for (const k in data) {
                loadedMeals.push({
                    id: data[k].id,
                    name: data[k].name,
                    description:data[k].description,
                    price: data[k].price
                });
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        };

            requestHandler().catch((error) => {
                setIsLoading(false);
                setHttpError(error.message);   
            });       
    }, []);

    var mealsList = null;


    /* //POST
    async function postHandler(meal) {
        const response = await fetch('https://react-httprequest-2a14f-default-rtdb.firebaseio.com/meals.json', {
            method: 'POST',
            body: JSON.stringify(meal),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('postReponse: ' + data);
    } */


    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>);
    }

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        );
    }

    mealsList = meals.map(meal => (
        <MealItem 
            id={meal.id}
            key={meal.id} 
            name={meal.name} 
            description={meal.description} 
            price={+meal.price}
        ></MealItem>));
    

    return (
        <section className={classes.meals}>
            <Card>
               <ul>{mealsList}</ul> 
            </Card>
        </section>
    );
};

export default AvailableMeals;
