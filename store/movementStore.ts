// store/movementStore.ts
import { create } from 'zustand';

export const useMovementStore = create((set) => ({
  movements: {},

  addMovement: (productId, movement) =>
    set((state) => ({
      movements: {
        ...state.movements,
        [productId]: [
          ...(state.movements[productId] || []),
          { id: Date.now(), ...movement },
        ]
      }
    })),
}));
