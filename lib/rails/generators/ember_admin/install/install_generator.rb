module EmberAdmin
  module Generators
    class InstallGenerator < ::Rails::Generators::Base

      desc "This generator installs ember-admin into app/assets/javascripts"
      source_root File.expand_path('../templates', __FILE__)

      def copy
        %w(config.coffee navigation.coffee router.coffee store.coffee).each do |file|
          copy_file file, "app/assets/javascripts/admin/#{file}"
        end
      end
    end
  end
end
