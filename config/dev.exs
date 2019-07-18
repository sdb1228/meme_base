use Mix.Config

# Configure your database
config :meme_base, MemeBase.Repo,
  username: "postgres",
  password: "postgres",
  database: "meme_base_dev",
  hostname: "localhost",
  show_sensitive_data_on_connection_error: true,
  pool_size: 10

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with webpack to recompile .js and .css sources.
config :meme_base, MemeBaseWeb.Endpoint,
  http: [port: 4000],
  https: [
    port: 4001,
    cipher_suite: :strong,
    certfile: "priv/cert/meme_base_sp.pem",
    keyfile: "priv/cert/meme_base_sp_key.pem"
  ],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [
    node: [
      "node_modules/webpack/bin/webpack.js",
      "--mode",
      "development",
      "--watch-stdin",
      cd: Path.expand("../assets", __DIR__)
    ]
  ]

# ## SSL Support
#
# In order to use HTTPS in development, a self-signed
# certificate can be generated by running the following
# Mix task:
#
#     mix phx.gen.cert
#
# Note that this task requires Erlang/OTP 20 or later.
# Run `mix help phx.gen.cert` for more information.
#
# The `http:` config above can be replaced with:
#
#     https: [
#       port: 4001,
#       cipher_suite: :strong,
#       keyfile: "priv/cert/selfsigned_key.pem",
#       certfile: "priv/cert/selfsigned.pem"
#     ],
#
# If desired, both `http:` and `https:` keys can be
# configured to run both http and https servers on
# different ports.

# Watch static and templates for browser reloading.
config :meme_base, MemeBaseWeb.Endpoint,
  live_reload: [
    patterns: [
      ~r"priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$",
      ~r"priv/gettext/.*(po)$",
      ~r"lib/meme_base_web/{live,views}/.*(ex)$",
      ~r"lib/meme_base_web/templates/.*(eex)$"
    ]
  ]


config :samly, Samly.Provider,
  idp_id_from: :path_segment,
  service_providers: [
    %{
      id: "memebase-sp",
      entity_id: "urn:memebase.com:fake-okta",
      certfile: "priv/cert/meme_base_sp.pem",
      keyfile: "priv/cert/meme_base_sp_key.pem",
      #contact_name: "Affiliates Admin",
      #contact_email: "affiliates-admin@do-good.org",
      #org_name: "Do Good",
      #org_displayname: "Goodly, No evil!",
      #org_url: "https://do-good.org"
    }
  ],
  identity_providers: [
    %{
      id: "okta",
      sp_id: "memebase-sp",
      metadata_file: "config/simple_saml.xml",
      pre_session_create_pipeline: MemeBaseWeb.Plugs.SamlyPipeline, #< -- problem
      #use_redirect_for_req: false,
      #sign_requests: true,
      #sign_metadata: true,
      #signed_assertion_in_resp: true,
      #signed_envelopes_in_resp: true,
      #allow_idp_initiated_flow: false,
      #allowed_target_urls: ["https://do-good.org"],
      #nameid_format: :transient
    }
  ]


# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Initialize plugs at runtime for faster development compilation
config :phoenix, :plug_init_mode, :runtime
