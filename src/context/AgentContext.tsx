import React, { createContext, useContext, useReducer, useEffect } from 'react';  
import { Agent } from '../types/Agent';  

interface State {  
    agents: Agent[];  
}  

interface Action {  
    type: string;  
    payload: any;  
}  

const initialState: State = {  
    agents: JSON.parse(localStorage.getItem('agents') as string) || [],  
};  

const AgentContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);  

const agentReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_AGENTS':
            localStorage.setItem('agents', JSON.stringify(action.payload));
            return { ...state, agents: action.payload };
        case 'REMOVE_AGENT': // Add this case
            const updatedAgents = state.agents.filter(agent => agent.id !== action.payload);
            localStorage.setItem('agents', JSON.stringify(updatedAgents)); // Update local storage
            return { ...state, agents: updatedAgents };
        default:
            return state;
    }
};

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {  
    const [state, dispatch] = useReducer(agentReducer, initialState);  

    useEffect(() => {  
        const fetchData = async () => {  
            const response = await fetch('http://localhost:5000/agents');  
            const data = await response.json();  
            dispatch({ type: 'SET_AGENTS', payload: data });  
        };  
        if (state.agents.length === 0) fetchData();  
    }, [state.agents.length]);  

    return <AgentContext.Provider value={{ state, dispatch }}>{children}</AgentContext.Provider>;  
};  

export const useAgentContext = () => {  
    const context = useContext(AgentContext);  
    if (!context) {  
        throw new Error('useAgentContext must be used within an AgentProvider');  
    }  
    return context;  
};