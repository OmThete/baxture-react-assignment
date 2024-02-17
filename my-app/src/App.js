import { Text, Button } from '@mantine/core';
import { IconUserPlus, IconTrash, IconAt, IconPhoneCall, IconWorld } from '@tabler/icons-react';
import '@mantine/core/styles.css';
import './App.css';
import { useEffect, useState } from 'react';

// extracting the initials from the user's name and useing in the URL to generate the avatar
const getInitials = (name) => {
  const words = name.split(' ');
  return words.map(word => word[0].toUpperCase()).join('');
};

const App = () => {
  const [cards, setCard] = useState([]);

  //fetching the users data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result);
        setCard(result);
      }
      catch (error) {
        console.error("Error fething data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <div className="card-container">
        {cards.map((user) => (
          <div key={user.id} className="card">
            <div className="card-body">
              <div className='icon-name-container'>
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${getInitials(user.name)}`} alt={`${user.username}-avatar`} className='users-name-icon' />
                <Text leftSection={<IconAt size={14} />} className="user-name">{user.name}</Text>
              </div>
              <div className='user-details-container'>
                <div>
                  <Text icon={<IconAt size={14} />} className="user-email" style={{ verticalAlign: 'middle', marginRight: '5px' }}>@ {user.email}</Text>
                </div>
                <div className='user-phone'>
                  <IconPhoneCall size={14} style={{ verticalAlign: 'middle',marginRight: '5px' }} />
                  {user.phone}
                </div>
                <div className='user-website'>
                  <IconWorld size={14} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  {user.website}
                </div>
              </div>
            </div>
            <div className='button-container'>
              <Button leftSection={<IconUserPlus size={14} />} className='follow-btn'>Follow</Button>
              <Button leftSection={<IconTrash size={14} />} variant="default" className='delete-btn'>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
