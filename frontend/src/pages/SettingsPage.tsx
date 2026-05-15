import { mockUser } from "../data/mockData";

const SettingsPage = () => {
  const user = mockUser;

  return (
    <div className="flex-1 p-gutter md:p-xl w-full flex flex-col gap-xl lg:w-[80vw]">
      {/* Header */}
      <header className="flex flex-col gap-sm">
        <h1 className="font-display text-headline-lg text-on-surface">
          Settings
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Manage your account preferences, profile details, and platform
          experience.
        </p>
      </header>

      {/* Settings Sections */}
      <div className="flex flex-col gap-xl w-full">
        {/* Profile Information */}
        <div className="w-full flex flex-col gap-lg">
          {/* Profile Settings Card */}
          <section className="bg-surface border border-outline-variant rounded-xl p-lg flex flex-col gap-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-secondary"></div>
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">
                manage_accounts
              </span>
              Profile Information
            </h2>

            {/* Avatar Edit */}
            <div className="flex items-center gap-lg">
              <div className="relative group cursor-pointer">
                <img
                  alt="Current Avatar"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuATVb7PXXHtNNJHF4gUYdhPcxb-ScN-6ursOuMQqI7d0NNvlCyNC3K5W20UcG0WZOzrPE9-n6PMrqErlIMn4Kst-6CS_dd7C5kyBVAaETqWbXCRl340ApzAt4mvcW6UPkQIVANzPeDSvPL_Fajs2Yu1WbiHDzc9WdK52SYZjInbyZ-pfRUDNMktbZFnVvmqdaf3-7H65PyQO8YUcut9XqcvXTcrKkiUEKQnLD9iqpW5BCANJMmQqz4gB9SMpkOW-ckVBXzVLaNDCmY"
                  className="w-24 h-24 rounded-full object-cover border-2 border-surface-variant"
                />
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white">
                    photo_camera
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-sm">
                <button className="bg-surface-variant hover:bg-surface-container-high text-on-surface px-md py-sm rounded border border-outline-variant font-label-sm text-label-sm uppercase transition-colors w-fit">
                  Upload New Image
                </button>
                <span className="font-body-md text-[13px] text-on-surface-variant">
                  Recommended: 400x400px, JPG or PNG.
                </span>
              </div>
            </div>

            <hr className="border-outline-variant border-t" />

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              {/* Name */}
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Display Name
                </label>
                <input
                  className="bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  type="text"
                  defaultValue={user.name}
                />
              </div>

              {/* Role/Headline */}
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Headline
                </label>
                <input
                  className="bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  type="text"
                  defaultValue={user.role}
                />
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-xs md:col-span-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Bio
                </label>
                <textarea
                  className="bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  rows={4}
                  defaultValue={user.bio}
                ></textarea>
                <span className="self-end font-body-md text-[12px] text-on-surface-variant mt-1">
                  138 / 300
                </span>
              </div>
            </div>

            {/* Interests & Links */}
            <div className="flex flex-col gap-md mt-md">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Technical Interests
              </label>
              <div className="flex flex-wrap gap-sm">
                <span className="bg-surface-variant text-secondary-fixed border border-outline-variant px-sm py-1 rounded font-code-md text-[13px] flex items-center gap-xs">
                  React
                  <button className="hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-[16px]">
                      close
                    </span>
                  </button>
                </span>
                <span className="bg-surface-variant text-tertiary-fixed border border-outline-variant px-sm py-1 rounded font-code-md text-[13px] flex items-center gap-xs">
                  TailwindCSS
                  <button className="hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-[16px]">
                      close
                    </span>
                  </button>
                </span>
                <span className="bg-surface-variant text-primary-fixed border border-outline-variant px-sm py-1 rounded font-code-md text-[13px] flex items-center gap-xs">
                  UI/UX
                  <button className="hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-[16px]">
                      close
                    </span>
                  </button>
                </span>
                <button className="bg-transparent border border-dashed border-outline hover:border-primary hover:text-primary text-on-surface-variant px-sm py-1 rounded font-code-md text-[13px] flex items-center gap-xs transition-colors">
                  <span className="material-symbols-outlined text-[16px]">
                    add
                  </span>{" "}
                  Add
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-xs mt-md">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Social Links
              </label>
              <div className="flex items-center gap-sm bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <span className="text-on-surface-variant font-code-md text-sm">
                  github.com/
                </span>
                <input
                  className="bg-transparent border-none outline-none text-on-surface font-body-md text-body-md flex-1 w-full p-0"
                  type="text"
                  defaultValue={user.username}
                />
              </div>
            </div>

            {/* Save Action */}
            <div className="flex justify-end pt-md border-t border-outline-variant mt-md">
              <button className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container px-lg py-sm rounded-lg font-label-sm text-label-sm uppercase font-bold transition-colors">
                Save Changes
              </button>
            </div>
          </section>
        </div>

        {/* Preferences */}
        <div className="w-full flex flex-col gap-lg">
          <section className="bg-surface border border-outline-variant rounded-xl p-lg flex flex-col gap-lg">
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
              <span className="material-symbols-outlined text-tertiary">
                tune
              </span>
              Preferences
            </h2>

            <div className="flex flex-col gap-lg">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                  <span className="font-body-md text-body-md text-on-surface font-medium">
                    Appearance
                  </span>
                  <span className="font-body-md text-[13px] text-on-surface-variant">
                    Toggle dark or light mode
                  </span>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <div className="w-14 h-7 bg-primary rounded-full relative transition-colors border border-primary-container">
                    <div className="absolute left-1 top-1 w-5 h-5 bg-on-primary rounded-full transition-transform translate-x-7 flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-[14px] text-primary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        dark_mode
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-outline-variant" />

              {/* Language Selection */}
              <div className="flex flex-col gap-sm">
                <div className="flex flex-col gap-xs mb-sm">
                  <span className="font-body-md text-body-md text-on-surface font-medium">
                    Interface Language
                  </span>
                  <span className="font-body-md text-[13px] text-on-surface-variant">
                    Select your preferred language
                  </span>
                </div>

                <div className="flex flex-col gap-sm">
                  <label className="flex items-center gap-md p-md rounded-lg border-2 border-primary bg-primary/10 cursor-pointer transition-colors">
                    <input
                      className="text-primary bg-surface border-outline focus:ring-primary focus:ring-offset-surface w-4 h-4"
                      name="language"
                      type="radio"
                      defaultChecked
                    />
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface font-medium">
                        English
                      </span>
                      <span className="font-label-sm text-[12px] text-on-surface-variant">
                        System Default
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-md p-md rounded-lg border border-outline-variant hover:bg-surface-variant cursor-pointer transition-colors">
                    <input
                      className="text-primary bg-surface border-outline focus:ring-primary focus:ring-offset-surface w-4 h-4"
                      name="language"
                      type="radio"
                    />
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface font-medium">
                        Arabic (العربية)
                      </span>
                      <span className="font-label-sm text-[12px] text-on-surface-variant">
                        RTL Support
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <hr className="border-outline-variant" />

              {/* Danger Zone */}
              <div className="flex flex-col gap-sm pt-sm">
                <span className="font-body-md text-body-md text-error font-medium">
                  Danger Zone
                </span>
                <button className="bg-transparent border border-error text-error hover:bg-error hover:text-on-error w-full py-sm rounded-lg font-label-sm text-label-sm uppercase font-bold transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
