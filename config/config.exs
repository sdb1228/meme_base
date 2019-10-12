# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :meme_base,
  ecto_repos: [MemeBase.Repo]

# Configures the endpoint
config :meme_base, MemeBaseWeb.Endpoint,
  url: [host: System.get_env("HOST", "localhost")],
  secret_key_base: "3pBVPiXSlxml7C2BSjPmibAn8d2x/XbFs/x1s7uUaUIqGJBnnxpcISqiJzzI8GqA",
  render_errors: [view: MemeBaseWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: MemeBase.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
