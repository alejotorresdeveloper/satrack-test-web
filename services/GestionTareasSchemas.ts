/**
 * Generated by @openapi-codegen
 *
 * @version 1.0
 */
export type BooleanCustomResponse = {
  /**
   * @format int32
   */
  errorCode?: number;
  message?: string | null;
  data?: boolean;
};

export type CrearTareaCategoriaResponse = {
  /**
   * @format uuid
   */
  id?: string;
  nombre?: string | null;
};

export type CrearTareaRequest = {
  descripcion?: string | null;
  /**
   * @format date-time
   */
  fechaLimite?: string;
  /**
   * @format uuid
   */
  categoriaId?: string;
};

export type CrearTareaResponse = {
  /**
   * @format uuid
   */
  id?: string;
  descripcion?: string | null;
  /**
   * @format date-time
   */
  fechaLimite?: string;
  /**
   * @format date-time
   */
  fechaFinalizacion?: string | null;
  cumplida?: boolean;
  categoria?: CrearTareaCategoriaResponse;
  /**
   * @format date-time
   */
  fechaCreacion?: string;
};

export type CrearTareaResponseCustomResponse = {
  /**
   * @format int32
   */
  errorCode?: number;
  message?: string | null;
  data?: CrearTareaResponse;
};

export type ModificarTareaRequest = {
  descripcion?: string | null;
  /**
   * @format date-time
   */
  fechaLimite?: string;
  /**
   * @format uuid
   */
  categoriaId?: string;
};

export type ObjectCustomResponse = {
  /**
   * @format int32
   */
  errorCode?: number;
  message?: string | null;
  data?: void | null;
};

export type ObtenerCategoriasResponse = {
  /**
   * @format uuid
   */
  id?: string;
  descripcion?: string | null;
};

export type ObtenerCategoriasResponseListCustomResponse = {
  /**
   * @format int32
   */
  errorCode?: number;
  message?: string | null;
  data?: ObtenerCategoriasResponse[] | null;
};

export type ObtenerTareaCategoriaResponse = {
  /**
   * @format uuid
   */
  id?: string;
  nombre?: string | null;
};

export type ObtenerTareaResponse = {
  /**
   * @format uuid
   */
  id?: string;
  descripcion?: string | null;
  estadoTarea?: string | null;
  /**
   * @format date-time
   */
  fechaLimite?: string;
  /**
   * @format date-time
   */
  fechaFinalizacion?: string;
  cumplida?: boolean;
  categoria?: ObtenerTareaCategoriaResponse;
  /**
   * @format date-time
   */
  fechaCreacion?: string;
};

export type ObtenerTareaResponseCustomResponse = {
  /**
   * @format int32
   */
  errorCode?: number;
  message?: string | null;
  data?: ObtenerTareaResponse;
};

export type ObtenerTareaResponseListCustomResponse = {
  /**
   * @format int32
   */
  errorCode?: number;
  message?: string | null;
  data?: ObtenerTareaResponse[] | null;
};
