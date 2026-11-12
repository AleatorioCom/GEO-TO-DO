import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { loadTasks, saveTasks } from '../services/StorageService';
import { configureNotifications } from '../services/NotificationService';
import { resetGeofenceState } from '../services/NotificationService';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    loadTasks().then(saved => {
      if (active) setTasks(saved);
    }).finally(() => {
      if (active) setLoaded(true);
    });
    configureNotifications().catch(error => console.warn(error));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (loaded) saveTasks(tasks).catch(() => {});
  }, [tasks, loaded]);

  const addTask = useCallback(task => {
    const newTask = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      description: '',
      radius: 100,
      completed: false,
      latitude: -23.5505,
      longitude: -46.6333,
      ...task
    };
    setTasks(current => [newTask, ...current]);
    return newTask;
  }, []);

  const updateTask = useCallback((id, changes) => {
    setTasks(current => current.map(task => task.id === id ? { ...task, ...changes } : task));
  }, []);

  const completeTask = useCallback(id => {
    setTasks(current => current.map(task => task.id === id ? { ...task, completed: true } : task));
    resetGeofenceState(id);
  }, []);

  const deleteTask = useCallback(id => {
    setTasks(current => current.filter(task => task.id !== id));
    resetGeofenceState(id);
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, loaded, addTask, updateTask, completeTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks deve ser usado dentro de TaskProvider.');
  return context;
}
