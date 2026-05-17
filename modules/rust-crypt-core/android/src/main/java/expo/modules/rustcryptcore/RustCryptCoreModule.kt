package expo.modules.rustcryptcore

import expo.modules.kotlin.modules.Module
import android.util.Base64
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL
import uniffi.crypt_core.decryptBytes
import uniffi.crypt_core.encryptBytes
import uniffi.crypt_core.decryptFile
import uniffi.crypt_core.encryptFile

class RustCryptCoreModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('RustCryptCore')` in JavaScript.
    Name("RustCryptCore")

    // Defines constant property on the module.
    Constant("PI") {
      Math.PI
    }

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    AsyncFunction("encryptBase64") { plaintextBase64: String, password: String ->
      val plaintext = Base64.decode(plaintextBase64, Base64.NO_WRAP)
      val ciphertext = encryptBytes(plaintext, password)
      Base64.encodeToString(ciphertext, Base64.NO_WRAP)
    }

    AsyncFunction("decryptBase64") { ciphertextBase64: String, password: String ->
      val ciphertext = Base64.decode(ciphertextBase64, Base64.NO_WRAP)
      val plaintext = decryptBytes(ciphertext, password)
      Base64.encodeToString(plaintext, Base64.NO_WRAP)
    }

    AsyncFunction("encryptFile") { inP: String, outP: String, pwd: String ->
      encryptFile(inP, outP, pwd)
    }

    AsyncFunction("decryptFile") { inP: String, outP: String, pwd: String ->
      decryptFile(inP, outP, pwd)
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(RustCryptCoreView::class) {
      // Defines a setter for the `url` prop.
      Prop("url") { view: RustCryptCoreView, url: URL ->
        view.webView.loadUrl(url.toString())
      }
      // Defines an event that the view can send to JavaScript.
      Events("onLoad")
    }
  }
}
