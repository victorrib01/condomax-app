// Importando as bibliotecas e módulos necessários
import * as React from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Tipos personalizados para ações e despachos
type CustomSetStateAction<T> = T | null | ((prevState: T | null) => T | null);
type CustomDispatch<T> = (action: CustomSetStateAction<T>) => void;

// Tipo de retorno para o hook useAsyncState
type UseStateHook<T> = [[boolean, T | null], CustomDispatch<T>];

// Tipo de ação explícita
type Action<T> = T | null | ((prevState: T | null) => T | null);

/**
 * Hook personalizado para gerenciar estados assíncronos.
 *
 * @param initialValue - O valor inicial do estado.
 * @returns Um array contendo o estado e a função de despacho.
 */
function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  const [state, _dispatch] = React.useReducer<
    React.Reducer<[boolean, T | null], Action<T>>
  >((state, action) => {
    if (typeof action === "function") {
      return [false, (action as Function)(state[1])];
    }
    return [false, action];
  }, initialValue);

  const dispatch: CustomDispatch<T> = React.useCallback((action) => {
    _dispatch(action);
  }, []);

  return [state, dispatch];
}

/**
 * Função assíncrona para salvar um item no armazenamento seguro ou no localStorage.
 *
 * @param key - A chave do item.
 * @param value - O valor do item.
 */
export async function setStorageItemAsync(
  key: string,
  value: string | null
): Promise<void> {
  try {
    // Adicionado try...catch
    if (Platform.OS === "web") {
      value === null
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, value);
    } else {
      value === null
        ? await SecureStore.deleteItemAsync(key)
        : await SecureStore.setItemAsync(key, value);
    }
  } catch (e) {
    console.error("Storage operation failed:", e);
  }
}

/**
 * Hook personalizado para gerenciar o estado armazenado.
 *
 * @param key - A chave do item armazenado.
 * @returns Um array contendo o estado e a função de despacho.
 */
export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  React.useEffect(() => {
    const fetchStorage = async () => {
      try {
        // Adicionado try...catch
        if (Platform.OS === "web") {
          const value = localStorage.getItem(key) || null;
          setState(value);
        } else {
          const value = await SecureStore.getItemAsync(key);
          setState(value || null);
        }
      } catch (e) {
        console.error("Fetching from storage failed:", e);
      }
    };

    fetchStorage();
  }, [key]);

  const setValue: CustomDispatch<string> = React.useCallback(
    (value) => {
      setStorageItemAsync(key, value as string | null)
        .then(() => setState(value || null))
        .catch((e) => console.error("Setting storage item failed:", e)); // Adicionado tratamento de erro
    },
    [key]
  );

  return [state, setValue];
}
