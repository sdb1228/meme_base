defmodule MemeBaseWeb.Router do
  use MemeBaseWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    #plug :protect_from_forgery TODO: uncomment this
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/sso" do
    forward "/", Samly.Router
  end

  scope "/", MemeBaseWeb do
    pipe_through :browser

    get "/", PageController, :index
    post "/upload", PageController, :upload
    get "/health_check", PageController, :health_check
  end

  pipeline :graphql do
    plug :fetch_session
    plug MemeBase.SchemaContext
  end

  scope "/graphql" do
    pipe_through :graphql
    forward "/", Absinthe.Plug, schema: MemeBase.Schema
  end

  scope "/graphiql" do
    pipe_through :graphql
    forward "/", Absinthe.Plug.GraphiQL, schema: MemeBase.Schema, interface: :simple
  end

  # Other scopes may use custom stacks.
  # scope "/api", MemeBaseWeb do
  #   pipe_through :api
  # end
end
