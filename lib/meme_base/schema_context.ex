defmodule MemeBase.SchemaContext do
  @behaviour Plug

  def init(opts), do: opts

  def call(conn, _opts) do
    # TODO - use the samly "computed" attributes to make a proper
    # "current_user" to pass in here
    context = if saml_crap = Samly.get_active_assertion(conn) do
      %{saml: saml_crap, current_user: saml_crap.attributes}
    else
      %{}
    end

    Absinthe.Plug.put_options(conn, context: context)
  end
end
