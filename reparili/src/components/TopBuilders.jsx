import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const TopBuilders = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/auth/builderslts')
      .then(res => {
        if (res.data.Status) {
          const builders = res.data.Result;
          
          const sorted = builders
            .sort((a, b) => b.done_work_count - a.done_work_count)
            .slice(0, 10)
            .map(b => ({
              name: `${b.nom} ${b.prenom}`,
              doneWork: b.done_work_count
            }));
          setData(sorted);
          console.log('Chart data:', sorted);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const maxDoneWork = data.length > 0 ? Math.max(...data.map(d => d.doneWork)) : 0;
  const yTicks = [];
  for (let i = 0; i <= maxDoneWork; i++) {
    yTicks.push(i);
  }

  return (
    <div className='login-page'>
      <div style={{ width: '100%', height: 400, padding: '20px', backgroundColor: 'white' }}>
        <h2 style={{ textAlign: 'center' }}>Top Builders</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 40, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, maxDoneWork]} ticks={yTicks} />
            <Tooltip />
            <Legend 
              verticalAlign="top" 
              align="right" 
              wrapperStyle={{ paddingRight: 20, paddingTop: 10 }} 
            />
            <Bar dataKey="doneWork" fill="#007bff" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            onClick={() => navigate('/builders')} 
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Return to Builders
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBuilders;
