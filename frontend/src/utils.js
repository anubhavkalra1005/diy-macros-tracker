const calculateMacros = (quantity, selectedFood) => {
    if (!selectedFood) return { calories: 0, protein: 0, carbohydrates: 0, fats: 0 };
    const factor = quantity / selectedFood.quantity;
    return {
        calories: (selectedFood.calories * factor).toFixed(2) || 0,
        protein: (selectedFood.protein * factor).toFixed(2) || 0,
        carbohydrates: (selectedFood.carbohydrates * factor).toFixed(2) || 0,
        fats: (selectedFood.fats * factor).toFixed(2) || 0,
    };
};

export { calculateMacros };