package com.barbellwhip;

import android.os.Bundle;
import android.content.Intent;
import androidx.annotation.Nullable;
import android.net.Uri;
import android.database.Cursor;
import android.provider.OpenableColumns;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "barbellwhip";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    handleIntent(getIntent());
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
    handleIntent(intent);
  }

  private void handleIntent(Intent intent) {
    if(intent != null) {
      String action = intent.getAction();
      String type = intent.getType();
      Uri data = intent.getData();

      if(Intent.ACTION_SEND.equals(action) && type != null) {
        if("application/json".equals(type)) {
          handleSendFile(intent);
        }
      } else if(Intent.ACTION_VIEW.equals(action) && data != null) {
        handleViewFile(intent);
      }
    }
  }

  void handleSendFile(Intent intent) {
    Uri fileUri = intent.getParcelableExtra(Intent.EXTRA_STREAM);
    if(fileUri != null) {
      String fileName = getFileName(fileUri);
      sendToReactNative("file", fileUri.toString(), fileName);
    }
  }

  void handleViewFile(Intent intent) {
    Uri fileUri = intent.getData();
    if(fileUri != null) {
      String fileName = getFileName(fileUri);
      sendToReactNative("file", fileUri.toString(), fileName);
    }
  }

  private String getFileName(Uri uri) {
    String result = null;
    if(uri.getScheme().equals("content")) {
      try(Cursor cursor = getContentResolver().query(uri, null, null, null, null)) {
        if(cursor != null && cursor.moveToFirst()) {
          result = cursor.getString(cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME));
        }
      }
    }
    if(result == null) {
      result = uri.getLastPathSegment();
    }
    return result;
  }

  private void sendToReactNative(String type, String data, @Nullable String fileName) {
    WritableMap params = Arguments.createMap();
    params.putString("type", type);
    params.putString("data", data);
    if(fileName != null) {
      params.putString("fileName", fileName);
    }
    getReactInstanceManager().getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ShareIntent", params);
  }
}
