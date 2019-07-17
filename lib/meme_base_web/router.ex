defmodule MemeBaseWeb.Router do
  use MemeBaseWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
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
  end

  forward "/graphql", Absinthe.Plug, schema: MemeBase.Schema

  forward "/graphiql", Absinthe.Plug.GraphiQL, schema: MemeBase.Schema, interface: :simple

  # Other scopes may use custom stacks.
  # scope "/api", MemeBaseWeb do
  #   pipe_through :api
  # end
end
