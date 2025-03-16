import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', description: '' });

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/recipes/');
                setRecipes(response.data.recipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/recipes/${id}`);
            setRecipes(recipes.filter(recipe => recipe._id !== id));
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const handleEditClick = (recipe) => {
        setEditingRecipe(recipe._id);
        setEditFormData({ name: recipe.name, description: recipe.description });
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/recipes/${id}`, editFormData);
            setRecipes(recipes.map(recipe => recipe._id === id ? response.data.recipe : recipe));
            setEditingRecipe(null);
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    return (
        <div>
            <h3>All Recipes</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe, index) => (
                        <tr key={recipe._id}>
                            <td>{index + 1}</td>
                            <td>
                                {editingRecipe === recipe._id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={editFormData.name}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    recipe.name
                                )}
                            </td>
                            <td>
                                {editingRecipe === recipe._id ? (
                                    <input
                                        type="text"
                                        name="description"
                                        value={editFormData.description}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    recipe.description
                                )}
                            </td>
                            <td>
                                {editingRecipe === recipe._id ? (
                                    <button className="btn btn-success btn-sm" onClick={() => handleEditSubmit(recipe._id)}>
                                        Save
                                    </button>
                                ) : (
                                    <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(recipe)}>
                                        Edit
                                    </button>
                                )}
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(recipe._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllRecipes;
