import Sidebar from '../../Components/Admin/Sidebar';
import AllRecipes from '../../Components/Admin/AllRecipes';
import CreateRecipeForm from '../../Components/Admin/CreateRecipeForm';
import Users from '../../Components/Admin/AllUsers';
import Messages from '../../Components/Admin/userMessages';
import { useState } from 'react';

export default function AdminDashboard() {
  const [selectedOption, setSelectedOption] = useState('createRecipe');

  const renderContent = () => {
    switch (selectedOption) {
      case 'allRecipes':
        return <AllRecipes />;
      case 'createRecipe':
        return <CreateRecipeForm />;
      case 'users':
        return <Users />;
      case 'messages':
        return <Messages />;
      default:
        return <AllRecipes />;
    }
  };

  return (
    <div className="d-flex">
      <Sidebar setSelectedOption={setSelectedOption} />
      <div className="flex-grow-1 p-4 bg-light">
        {renderContent()}
      </div>
    </div>
  );
}
